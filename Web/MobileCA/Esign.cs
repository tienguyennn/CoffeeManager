using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Globalization;
using System.IO;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Hinet.Service.Common;

namespace Hinet.Web.MobileCA
{
    public static class Esign
    {
        static string phone = "84333965619";
        static string priKey = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAI1ZGghrDQryVQcDDe1gpJ1TQvRWZz0P59/04LlMOdcf0G7XGHy7tzmWffdKgVmlkTbw0tMGa37lg7Suxrm9JpmhcEQmTMo6L06SEmBYSiZfPWMyDnjdWhE8mPMP3ju3xx24UVXcpSclykQflTBr42yZgqsgM19ndsDFkwtz2uWDAgMBAAECgYAJzOPBMar111eN5OhSTSEcx2kdB+Cgmzm4jYIHVwGrqMkK5l8MRvetRoH1Y3UUgiZPaOM1Pny1j7RSEsw0lKjYY4Jawm5n7js13VkIs9tO8HhK00Oo/7a6ZRxAbczpfvGHmMdwaUQgHSGngzE7T3D8Eh4xx3Qu6fmTAIeKPNSMAQJBANfPb9gDkWIsQ/16siOQaTEfacASx/2MvucfrQ2WYGWbG1xNVfA1hkC2tmRRu3SRJp/1lhlERTvOSac4m9IBMasCQQCnq75nAlQTU+/1GvH8nLyEPrCudn40jMCKSEkMWJKKVuiKCrF2GJCZQipNs1DfMSyPggux3Z3hQ62JBuZfNvOJAkEAxIYCM5QMMHpe79Vrozc+k50nj+GKfTpOHeqajGUEI4K7x7IlMDmNqCC6t2A2dFA5/DCIHzosUeno6H6EZxjvQQJAY+IStgiUD0OEge4AU+0G/HzgAb5C5okmtfnj0j/9Y/3r3zgJiYGOuk3JJ6p3tc30brUYxGdyAtyvRx7eI8B3iQJBAJpa4qW6sJ36AKZFLq4D6EwaL2G3kc1bVFSwgRB0TFMB3Vak4O4mu1HWfgCWo20RvJCfcYCrIEdguvd3IunQ9Mc=";//Khai bao gia tri Prikey 
        static string apID = "AP2";//Khai bao AppId

        /// <summary>
        /// 
        /// </summary>
        /// <param name="input">dữ liệu file ký</param>
        /// <param name="output">đường dẫn lưu file sau khi ký</param>
        /// <param name="ImageSign">đường dẫn ảnh chữ ký số</param>
        /// <param name="XX">trục tung chữ ký</param>
        /// <param name="YY">trục hoành chữ ký</param>
        /// <param name="isScaleImage"></param>
        /// <returns></returns>
        public static string SignPDFSynsWithMobileCASyns(Stream input, string output, string ImageSign, float XX, float YY, bool isScaleImage = false)
        {
            try
            {
                var chuky1 = ImageSign;

                var signer = new PdfSignerSynchronous();
                var mobileCA = new MobileCA();

                var msisdn = phone;
                var userSelectCert = true;
                string certSerial = null;
                if (!userSelectCert)
                {
                    certSerial = "08276d4f2979228e";
                }

                var dataDisplay = "Phe duyet van ban bang chu ky so";
                var certList = mobileCA.GetCertificatefromPrikey(apID, msisdn, certSerial, priKey);

                var certParser = new Org.BouncyCastle.X509.X509CertificateParser();
                Org.BouncyCastle.X509.X509Certificate[] chain;
                if (certList.Length == 2)
                {
                    chain = new[] { certParser.ReadCertificate(Convert.FromBase64String(certList[1])) };
                }    
                else
                {
                    chain = new[] { certParser.ReadCertificate(Convert.FromBase64String(certList[0])) };
                }    


                if (chain == null)
                {
                    return "Phát sinh lỗi trong quá trình lấy chứng thư số";
                }
                signer.OriginX = XX;         
                signer.OriginY = YY;
                signer.CoordinateX = XX + 119;
                signer.CoordinateY = YY + 35;
                signer.SigPage = 1;// đóng dấu ở trang đầu
                signer.SigTextFormat = PdfSignerSynchronous.FORMAT_TEXT_4;
                signer.SigContact = UtilSigner.GetCNFromDN(chain[0].SubjectDN.ToString());
                signer.SigLocation = "Bac Kan";
                signer.IsMultiSignatures = true;
                signer.Visible = true;
                signer.TsaClient = null;
                signer.UseTSA = false;
                var signDate = DateTime.Now;

                // Create hash file
                byte[] hash = null;
                hash = signer.CreateHash_Text_Pic(input, output, chain, signDate, chuky1, isScaleImage);
                if (hash == null)
                {
                    return "Phát sinh lỗi trong quá trình thực hiện chữ ký số: Hash is null";
                }
                var signature = mobileCA.signSynchronouswithPrikey(hash, apID, msisdn, dataDisplay, priKey);

                if (signature == null)
                {
                    return "Phát sinh lỗi trong quá trình thực hiện chữ ký số: Signature is null";
                }

                // Insert signature into file
                if (signer.InsertSignature(signature))
                {
                    return "OK##";
                }
                else
                {
                    return "Phát sinh lỗi khi chèn chữ ký số vào file văn bản.";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        private static bool InsertTextToPdf(string sourceFileName, string newFileName, string sokyhieu, float x, float y, int page, int SoVanBanId)
        {
            using (Stream pdfStream = new FileStream(sourceFileName, FileMode.Open))
            using (Stream newpdfStream = new FileStream(newFileName, FileMode.Create, FileAccess.ReadWrite))
            {
                var insertTextResult = true;
                try
                {
                    PdfReader pdfReader = new PdfReader(pdfStream);
                    PdfStamper pdfStamper = new PdfStamper(pdfReader, newpdfStream);

                    string normalFontPath = @"C:\\Project\\Font\\times_0.ttf";
                    string italicFontPath = @"C:\\Project\\Font\\timesi_0.ttf";

                    PdfContentByte pdfContentByte = pdfStamper.GetOverContent(page);

                    #region thông tin số ký hiệu
                    pdfContentByte.BeginText();
                    BaseFont normalFont = BaseFont.CreateFont(normalFontPath, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
                    pdfContentByte.SetColorFill(BaseColor.BLACK);
                    pdfContentByte.SetFontAndSize(normalFont, 13);
                    pdfContentByte.ShowTextAligned(PdfContentByte.ALIGN_LEFT, sokyhieu, x, y, 0);
                    pdfContentByte.EndText();
                    #endregion

                    #region thông tin ngày tháng
                    pdfContentByte.BeginText();
                    BaseFont italicFont = BaseFont.CreateFont(italicFontPath, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
                    pdfContentByte.SetColorFill(BaseColor.BLACK);
                    pdfContentByte.SetFontAndSize(italicFont, 13);
                    var DateToInsert = "Tp.Hồ Chí Minh, ngày " + DateTime.Now.Day + ", tháng " + DateTime.Now.Month + ", năm " + DateTime.Now.Year;
                    if (SoVanBanId == 50)
                    {
                        string monthName = DateTime.Now.ToString("MMMM", CultureInfo.CreateSpecificCulture("en-US"));
                        DateToInsert = $"Ho Chi Minh City, {monthName} {DateTime.Now.Day} {DateTime.Now.Year}";
                    }
                    pdfContentByte.ShowTextAligned(PdfContentByte.ALIGN_RIGHT, DateToInsert, 500, y, 0);
                    pdfContentByte.EndText();
                    #endregion
                    pdfStamper.Close();
                    System.IO.File.Copy(newFileName, sourceFileName, true);
                }
                catch (Exception ex)
                {
                    //Log.Error(ex.Message, ex);
                    insertTextResult = false;
                }
                return insertTextResult;
            }
        }
    }
}