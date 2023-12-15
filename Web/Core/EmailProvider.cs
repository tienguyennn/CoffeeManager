using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Configuration;
using CommonHelper.String;
using Web.Common;
using System.Web.Hosting;
using System.Text.RegularExpressions;
using Service.Common;
using System.ComponentModel;
using CommonHelper.UIHelper;
using CommonHelper.ObjectExtention;
using System.Threading.Tasks;
using Repository;
using Service.AppUserService;
using Web.Models;
using Microsoft.Exchange.WebServices.Data;
using Task = System.Threading.Tasks.Task;

namespace Web.Common
{
    public class EmailProvider
    {
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(EmailProvider));
        private static string MailFrom = WebConfigurationManager.AppSettings["MailFrom"];
        private static string MailHost = WebConfigurationManager.AppSettings["MailHost"];
        private static string MailAlias = WebConfigurationManager.AppSettings["MailAlias"];
        private static string MailPort = WebConfigurationManager.AppSettings["MailPort"];
        private static string MailUserName = WebConfigurationManager.AppSettings["MailUserName"];
        private static string MailPassword = WebConfigurationManager.AppSettings["MailPassword"];
        private static string MailEnableSsl = WebConfigurationManager.AppSettings["MailEnableSsl"];
        private static string AllowSendMail = WebConfigurationManager.AppSettings["AllowSendMail"];
        private static string AllowMailList = WebConfigurationManager.AppSettings["AllowMailList"];
        private readonly IAppUserService _AppUserService;

        public static bool SendEmailDTISupport(string body, string subject, string address)
        {
            return SendEmailDTI(body, subject, new List<string>() { address });
        }
        public static bool SendEmailDTI(string body, string subject, List<string> address)
        {
            try
            {
                ExchangeService service = new ExchangeService(ExchangeVersion.Exchange2010_SP1);
                //service.Credentials = new NetworkCredential("dbi.support@mic.gov.vn", "vukts123");
                service.Credentials = new NetworkCredential("dti", "cdstpHCM@2023");
                //service.AutodiscoverUrl("dbi.support@mic.gov.vn");
                service.Url = new Uri("https://mail.tphcm.gov.vn/EWS/Exchange.asmx");
                EmailMessage emailMessage = new EmailMessage(service);
                emailMessage.Subject = subject;
                emailMessage.Body = new MessageBody(body);
                foreach (var item in address)
                {
                    emailMessage.ToRecipients.Add(item);
                }
                emailMessage.SendAndSaveCopy();
                log.Error("Gửi email DTI thành công đến: " + string.Join(",", address.ToArray()));
                return true;
            }
            catch (Exception ex)
            {
                log.Error("Gửi email DTI thất bại đến: " + string.Join(",", address.ToArray()) + ", lỗi: " + ex.Message, ex);
            }

            return false;
        }

        private static bool checkSettingAllowSendMail(string address)
        {
            if (AllowSendMail == "true")
            {
                return true;
            }
            else
            {
                var listAllow = AllowMailList.Split(';').ToList();
                var IsAllow = listAllow.Contains(address);
                return IsAllow;
            }
            return false;
        }
        public static bool sendEmail(string body, string subject, List<string> address)
        {

            log.Info("Bắt đầu gửi mail :" + subject + " đển " + string.Join(",", address));

            SmtpClient server = new SmtpClient();
            try
            {
                server.Host = MailHost;
                server.Port = MailPort.ToIntOrZero();

                System.Net.Mail.MailMessage mail = new System.Net.Mail.MailMessage();
                mail.From = new MailAddress(MailFrom, MailAlias);
                foreach (var item in address)
                {
                    if (!checkSettingAllowSendMail(item))
                    {
                        log.Info("Hệ thống đã tắt chức năng gửi email " + item);
                        return true;
                    }
                    else
                    {
                        mail.To.Add(item);
                    }

                }

                mail.Subject = subject;
                mail.Body = body;
                mail.IsBodyHtml = true;
                server.Credentials = new NetworkCredential(MailUserName, MailPassword);
                server.EnableSsl = MailEnableSsl == "true";
                server.Send(mail);
                log.Info("Gửi mail thành công :" + subject + " đển " + string.Join(",", address));
                return true;
            }
            catch (Exception ex)
            {
                log.Error("Gửi mail thất bại :" + subject + " đển " + string.Join(",", address), ex);
                return false;
            }
        }
        public static bool sendEmailSingle(string body, string subject, string address)
        {
            log.Info("Bắt đầu gửi mail :" + subject + " đển " + string.Join(",", address));
            if (!checkSettingAllowSendMail(address))
            {
                log.Info("Hệ thống đã tắt chức năng gửi email " + address);
                return true;
            }
            SmtpClient server = new SmtpClient();
            try
            {
                server.Host = MailHost;
                server.Port = MailPort.ToIntOrZero();

                System.Net.Mail.MailMessage mail = new System.Net.Mail.MailMessage();
                mail.From = new MailAddress(MailFrom, MailAlias);

                mail.To.Add(address);


                mail.Subject = subject;
                mail.Body = body;
                mail.IsBodyHtml = true;
                server.Credentials = new NetworkCredential(MailUserName, MailPassword);
                server.EnableSsl = MailEnableSsl == "true";
                server.Send(mail);
                log.Info("Gửi mail thành công :" + subject + " đển " + string.Join(",", address));
                return true;
            }
            catch (Exception ex)
            {
                log.Error("Gửi mail thất bại :" + subject + " đển " + address, ex);
                return false;
            }
        }
        public bool sendEmailSingleHangfire(string body, string subject, string address)
        {
            log.Info("Bắt đầu gửi mail :" + subject + " đển " + string.Join(",", address));
            if (!checkSettingAllowSendMail(address))
            {
                log.Info("Hệ thống đã tắt chức năng gửi email " + address);
                return true;
            }
            SmtpClient server = new SmtpClient();
            try
            {
                server.Host = MailHost;
                server.Port = MailPort.ToIntOrZero();

                System.Net.Mail.MailMessage mail = new System.Net.Mail.MailMessage();
                mail.From = new MailAddress(MailFrom, MailAlias);

                mail.To.Add(address);


                mail.Subject = subject;
                mail.Body = body;
                mail.IsBodyHtml = true;
                server.Credentials = new NetworkCredential(MailUserName, MailPassword);
                server.EnableSsl = MailEnableSsl == "true";
                server.Send(mail);
                log.Info("Gửi mail thành công :" + subject + " đển " + string.Join(",", address));
                return true;
            }
            catch (Exception ex)
            {
                log.Error("Gửi mail thất bại :" + subject + " đển " + address, ex);
                return false;
            }
        }
        /// <summary>
        /// Gửi email cho nhiều người
        /// </summary>
        /// <param name="body"></param>
        /// <param name="subject"></param>
        /// <param name="address"></param>
        /// <returns></returns>
        public bool sendMultiEmailSingleHangfire(string body, string subject, string address)
        {
            log.Info("Bắt đầu gửi mail :" + subject + " đển " + address);
            var listEmail = address.Split(',').ToList();
            var listToSend = new List<string>();
            foreach (var item in listEmail)
            {
                if (!checkSettingAllowSendMail(item))
                {
                    log.Info("Hệ thống đã tắt chức năng gửi email " + address);

                }
                else
                {
                    listToSend.Add(item);
                }
            }

            if (listToSend != null && listToSend.Any())
            {
                SmtpClient server = new SmtpClient();
                try
                {
                    server.Host = MailHost;
                    server.Port = MailPort.ToIntOrZero();

                    System.Net.Mail.MailMessage mail = new System.Net.Mail.MailMessage();
                    mail.From = new MailAddress(MailFrom, MailAlias);
                    foreach (var mailSend in listToSend)
                    {
                        mail.To.Add(mailSend);
                    }

                    mail.Subject = subject;
                    mail.Body = body;
                    mail.IsBodyHtml = true;
                    server.Credentials = new NetworkCredential(MailUserName, MailPassword);
                    server.EnableSsl = MailEnableSsl == "true";
                    server.Send(mail);
                    log.Info("Gửi mail thành công :" + subject + " đển " + string.Join(",", address));
                    return true;
                }
                catch (Exception ex)
                {
                    log.Error("Gửi mail thất bại :" + subject + " đển " + address, ex);
                    return false;
                }
            }
            return true;
        }
        private static string AddLayout(string content)
        {
            var layout = File.ReadAllText(Path.Combine(HostingEnvironment.MapPath("/"), "MailTemplate/layoutCommon.html"));
            if (!string.IsNullOrEmpty(layout))
            {
                layout = layout.Replace("[{ContentData}]", content);
                layout = layout.Replace("[{DateData}]", DateTime.Now.GetTextDisplay());
                return layout;
            }
            return content;
        }

        public static List<BindingKey> GetListKeyWithMailModel(string mailModel)
        {
            var model = new List<BindingKey>();
            try
            {
                var type = Type.GetType(mailModel);
                if (type != null)
                {
                    var getProperty = type.GetProperties();
                    foreach (var item in getProperty)
                    {
                        var name = item.Name;
                        var objdata = item.GetAttribute<DisplayNameAttribute>(false);
                        if (objdata != null)
                        {
                            name = objdata.DisplayName;
                        }
                        model.Add(new BindingKey()
                        {
                            Name = name,
                            Key = item.Name
                        });
                    }
                }
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                return new List<BindingKey>();
            }
            return model;
        }

        public static string BindingDataToMailContent<T>(object dataObj, string content) where T : class
        {
            if (!string.IsNullOrEmpty(content))
            {
                var listkey = Regex.Matches(content, @"\{\{[a-zA-Z0-9]{3,}\}\}");

                if (listkey != null && listkey.Count > 0)
                {
                    foreach (var item in listkey)
                    {
                        var propertyMath = Regex.Match(item.ToString(), @"^\{\{(?<pkey>[a-zA-Z0-9]{3,})\}\}$");
                        if (propertyMath.Success)
                        {
                            var propertyName = propertyMath.Groups["pkey"].ToString();

                            if (!string.IsNullOrEmpty(propertyName))
                            {
                                var valueProperty = string.Empty;
                                var data = dataObj as T;
                                var property = typeof(T).GetProperty(propertyName);
                                if (property != null)
                                {
                                    if (property.GetValue(data, null) != null)
                                    {
                                        valueProperty = property.GetValue(data, null).ToString();
                                    }
                                }
                                content = content.Replace(item.ToString(), valueProperty);
                            }
                        }
                        else
                        {
                            content = content.Replace(item.ToString(), string.Empty);
                        }
                    }
                }
            }
            return content;
        }

        //public static async Task sendEmailHoSoDichVuCongDetails(EmailHoSoDichVuCongViewModel model, List<DanhSachNguoiNhanEmailVM> danhSachNguoiNhanEmail)
        //{
        //    try
        //    {
        //        var groupTaskSendEmail = new List<Task>();
        //        foreach (var item in danhSachNguoiNhanEmail)
        //        {
        //            model.chucVu = item.chucVu;
        //            model.gender = item.gender;
        //            string body = ViewRenderer.RenderView("~/Views/EmailTemplate/EmailHoSoDichVuCongDetails.cshtml", model);
        //            string subject = "Hồ sơ dịch vụ công";
        //            groupTaskSendEmail.Add(Task.Run(() => sendEmailSingle(body, subject, item.address)));
        //        }
        //        await Task.WhenAll(groupTaskSendEmail);
        //    }
        //    catch (Exception ex)
        //    {
        //        log.Error(ex.Message, ex);
        //    }
        //}

        /// <summary>
        /// @author:duynn
        /// gửi email thông báo đã bổ sung hồ sơ
        /// </summary>
        /// <param name="model"></param>
        /// <param name="danhSachNguoiNhanEmail"></param>
        /// <returns></returns>
        //public static async Task SendEmailThongBaoDaBoSungHoSo(EmailHoSoDichVuCongViewModel model, List<DanhSachNguoiNhanEmailVM> danhSachNguoiNhanEmail)
        //{
        //    try
        //    {
        //        var groupTaskSendEmail = new List<Task>();
        //        foreach (var item in danhSachNguoiNhanEmail)
        //        {
        //            model.chucVu = item.chucVu;
        //            model.gender = item.gender;
        //            string body = ViewRenderer.RenderView("~/Views/EmailTemplate/EmailThongBaoDaBoSungHoSo.cshtml", model);
        //            string subject = "Bổ sung hồ sơ dịch vụ công";
        //            groupTaskSendEmail.Add(Task.Run(() => sendEmailSingle(body, subject, item.address)));
        //        }
        //        await Task.WhenAll(groupTaskSendEmail);
        //    }
        //    catch (Exception ex)
        //    {
        //        log.Error(ex.Message, ex);
        //    }
        //}


        //public static async Task sendEmailHoSoDichVuCongMoiTaoDetails(EmailHoSoDichVuCongViewModel model, List<DanhSachNguoiNhanEmailVM> danhSachNguoiNhanEmail)
        //{
        //    try
        //    {
        //        var groupTaskSendEmail = new List<Task>();
        //        foreach (var item in danhSachNguoiNhanEmail)
        //        {
        //            model.chucVu = item.chucVu;
        //            model.gender = item.gender;
        //            string body = ViewRenderer.RenderView("~/Views/EmailTemplate/EmailHoSoDichVuCongCoDieuChuyenDetails.cshtml", model);
        //            string subject = "Hồ sơ dịch vụ công";
        //            groupTaskSendEmail.Add(Task.Run(() => sendEmailSingle(body, subject, item.address)));
        //        }
        //        await Task.WhenAll(groupTaskSendEmail);
        //    }
        //    catch (Exception ex)
        //    {
        //        log.Error(ex.Message, ex);
        //    }
        //}

        //public static async Task sendEmailHoSoDichVuCongMoiTaoDetails(MoitUserFrontEndInfoDto entityNguoiGui,
        //    HoSoDichVuCongDto entityHoSoDichVuCong,
        //    List<DanhSachNguoiNhanEmailVM> danhSachNguoiNhanEmail)
        //{
        //    try
        //    {
        //        var groupTaskSendEmail = new List<Task>();
        //        foreach (var item in danhSachNguoiNhanEmail)
        //        {
        //            var emailViewModel = new EmailHoSoDichVuCongViewModel()
        //            {
        //                chucVu = item.chucVu,
        //                gender = item.gender,
        //                nguoiGui = entityNguoiGui,
        //                linkTruyCap = entityHoSoDichVuCong.Id.ToString(),
        //                EntityHoSoDichVuCong = entityHoSoDichVuCong,
        //            };
        //            string body = ViewRenderer.RenderView("~/Views/EmailTemplate/EmailHoSoDichVuCongCoDieuChuyenDetails.cshtml", emailViewModel);
        //            string subject = "Thông báo xử lý hồ sơ dịch vụ công";
        //            groupTaskSendEmail.Add(Task.Run(() => sendEmailSingle(body, subject, item.address)));
        //        }
        //        await Task.WhenAll(groupTaskSendEmail);
        //    }
        //    catch (Exception ex)
        //    {
        //        log.Error("Gửi email khong thành công " +ex.Message, ex);
        //    }
        //}




        //public static async Task sendEmailCongVanHoSoDichVuCongDetails(EmailHoSoDichVuCongViewModel model, List<DanhSachNguoiNhanEmailVM> danhSachNguoiNhanEmail)
        //{
        //    try
        //    {
        //        var groupTaskSendEmail = new List<Task>();
        //        foreach (var item in danhSachNguoiNhanEmail)
        //        {
        //            model.chucVu = item.chucVu;
        //            model.gender = item.gender;
        //            string body = ViewRenderer.RenderView("~/Views/EmailTemplate/sendEmailCongVanHoSoDichVuCongDetails.cshtml", model);
        //            string subject = "Hồ sơ dịch vụ công";
        //            groupTaskSendEmail.Add(Task.Run(() => sendEmailSingle(body, subject, item.address)));
        //        }
        //        await Task.WhenAll(groupTaskSendEmail);
        //    }
        //    catch (Exception ex)
        //    {
        //        log.Error(ex.Message, ex);
        //    }
        //}

        //public static async Task sendEmailHoSoDichVuCongTraVeDetails(EmailHoSoDichVuCongTraVeViewModel model, List<DanhSachNguoiNhanEmailVM> danhSachNguoiNhanEmail)
        //{
        //    try
        //    {
        //        var groupTaskSendEmail = new List<Task>();
        //        foreach (var item in danhSachNguoiNhanEmail)
        //        {
        //            model.chucVu = item.chucVu;
        //            model.gender = item.gender;
        //            string body = ViewRenderer.RenderView("~/Views/EmailTemplate/EmailHoSoDichVuCongTraVeDetails.cshtml", model);
        //            string subject = "Thông báo xử lý hồ sơ dịch vụ công";
        //            groupTaskSendEmail.Add(Task.Run(() => sendEmailSingle(body, subject, item.address)));
        //        }
        //        await Task.WhenAll(groupTaskSendEmail);
        //    }
        //    catch (Exception ex)
        //    {
        //        log.Error(ex.Message, ex);
        //    }
        //}

        public class BindingKey
        {
            public string Name { get; set; }
            public string Key { get; set; }
        }

        //public static async Task sendEmailHoSoDichVuCongGiaoKhachHang(EmailHoSoDichVuCongViewModel model, List<DanhSachNguoiNhanEmailVM> danhSachNguoiNhanEmail)
        //{
        //    try
        //    {
        //        var groupTaskSendEmail = new List<Task>();
        //        foreach (var item in danhSachNguoiNhanEmail)
        //        {
        //            string body = ViewRenderer.RenderView("~/Views/EmailTemplate/EmailHoSoDichVuCongGiaoKhachHang.cshtml", model);
        //            string subject = "Thông báo tiếp nhận hồ sơ dịch vụ công trực tuyến";
        //            groupTaskSendEmail.Add(Task.Run(() => sendEmailSingle(body, subject, item.address)));
        //        }
        //        await Task.WhenAll(groupTaskSendEmail);
        //    }
        //    catch (Exception ex)
        //    {
        //        log.Error(ex.Message, ex);
        //    }
        //}

        //public static async Task sendEmailHoSoDichVuCongMoiTaoGiaoKhachHang(EmailHoSoDichVuCongViewModel model, List<DanhSachNguoiNhanEmailVM> danhSachNguoiNhanEmail)
        //{
        //    try
        //    {
        //        var groupTaskSendEmail = new List<Task>();
        //        foreach (var item in danhSachNguoiNhanEmail)
        //        {
        //            string body = ViewRenderer.RenderView("~/Views/EmailTemplate/EmailHoSoDichVuCongMoiTaoGiaoKhachHang.cshtml", model);
        //            string subject = "Thông báo tiếp nhận hồ sơ dịch vụ công trực tuyến";
        //            groupTaskSendEmail.Add(Task.Run(() => sendEmailSingle(body, subject, item.address)));
        //        }
        //        await Task.WhenAll(groupTaskSendEmail);
        //    }
        //    catch (Exception ex)
        //    {
        //        log.Error(ex.Message, ex);
        //    }
        //}

        //public static async Task sendEmailHoSoDichVuCongMoiTaoGiaoKhachHang(MoitUserFrontEndInfoDto entityNguoiGui,
        //    HoSoDichVuCongDto entityHoSoDichVuCong, List<DanhSachNguoiNhanEmailVM> danhSachNguoiNhanEmail)
        //{
        //    try
        //    {
        //        var emailViewModel = new EmailHoSoDichVuCongViewModel()
        //        {
        //            nguoiGui = entityNguoiGui,
        //            linkTruyCap = entityHoSoDichVuCong.Id.ToString(),
        //            EntityHoSoDichVuCong = entityHoSoDichVuCong,
        //        };

        //        var groupTaskSendEmail = new List<Task>();
        //        foreach (var item in danhSachNguoiNhanEmail)
        //        {
        //            string body = ViewRenderer.RenderView("~/Views/EmailTemplate/EmailHoSoDichVuCongMoiTaoGiaoKhachHang.cshtml", emailViewModel);
        //            string subject = "Thông báo tiếp nhận hồ sơ dịch vụ công trực tuyến";
        //            groupTaskSendEmail.Add(Task.Run(() => sendEmailSingle(body, subject, item.address)));
        //        }
        //        await Task.WhenAll(groupTaskSendEmail);
        //    }
        //    catch (Exception ex)
        //    {
        //        log.Error(ex.Message, ex);
        //    }
        //}



        //public static async Task sendEmailHoSoDichVuCongTraVeKhachHangDetails(EmailHoSoDichVuCongViewModel model, DanhSachNguoiNhanEmailVM danhSachNguoiNhanEmail)
        //{
        //    try
        //    {
        //        model.chucVu = danhSachNguoiNhanEmail.chucVu;
        //        model.gender = danhSachNguoiNhanEmail.gender;
        //        string body = ViewRenderer.RenderView("~/Views/EmailTemplate/EmailHoSoDichVuCongTraVeKhachHang.cshtml", model);
        //        string subject = "Thông báo hồ sơ dịch vụ công cần được bổ sung";
        //        await Task.Run(()=> sendEmailSingle(body, subject, danhSachNguoiNhanEmail.address));
        //    }
        //    catch (Exception ex)
        //    {
        //        log.Error(ex.Message, ex);
        //    }
        //}

        //public static async Task sendEmailCongVanHoSoDichVuCongTraVeKhachHang(EmailHoSoDichVuCongViewModel model, DanhSachNguoiNhanEmailVM danhSachNguoiNhanEmail)
        //{
        //    try
        //    {
        //        model.chucVu = danhSachNguoiNhanEmail.chucVu;
        //        model.gender = danhSachNguoiNhanEmail.gender;
        //        string body = ViewRenderer.RenderView("~/Views/EmailTemplate/EmailCongVanHoSoDichVuCongTraVeKhachHang.cshtml", model);
        //        string subject = "Thông báo công văn hồ sơ dịch vụ công";
        //        await Task.Run(() => sendEmailSingle(body, subject, danhSachNguoiNhanEmail.address));
        //    }
        //    catch (Exception ex)
        //    {
        //        log.Error(ex.Message, ex);
        //    }
        //}

        public static void SendEmailThongBaoCapNhatTaiKhoan(EmailViewModel model)
        {
            try
            {
                string body = ViewRenderer.RenderView("~/Views/EmailTemplate/EmailThongBaoCapNhatTaiKhoan.cshtml", model);
                string subject = "Hệ thống PDTI: Thông báo mở đợt kê khai";
                if (!string.IsNullOrEmpty(model.Address))
                {
                    sendEmailSingle(body, subject, model.Address);
                }
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
            }
        }

        public static async Task SendEmailThongBaoTrinhDotKeKhai(EmailViewModel model)
        {
            try
            {
                string body = ViewRenderer.RenderView("~/Views/EmailTemplate/EmailThongBaoTrinhDotKeKhai.cshtml", model);
                string subject = "Hệ thống PDTI: Thông báo chuyên viên trình một đợt kê khai để duyệt";
                if (!string.IsNullOrEmpty(model.Address))
                {
                    Task.Run(() => sendEmailSingle(body, subject, model.Address));
                }
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
            }
        }

        public static async Task SendEmailThongBaoMoDotKeKhai(EmailViewModel model)
        {
            try
            {
                string body = ViewRenderer.RenderView("~/Views/EmailTemplate/EmailMoiThamGiaKeKhai.cshtml", model);
                string subject = "Hệ thống PDTI: Thông báo mở đợt kê khai";
                if (!string.IsNullOrEmpty(model.Address))
                {
                    Task.Run(() => sendEmailSingle(body, subject, model.Address));
                }
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
            }
        }

        /// <summary>
        /// @author:duynn
        /// @since: 09/
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>

        public static async Task SendEmailNhacNhoDotKeKhai(EmailViewModel model)
        {
            try
            {
                string body = ViewRenderer.RenderView("~/Views/EmailTemplate/EmailNhacNhoKeKhai.cshtml", model);
                string subject = "Hệ thống PDTI: Thông báo nhắc nhở gửi số liệu đợt kê khai";
                if (!string.IsNullOrEmpty(model.Address))
                {
                    Task.Run(() => sendEmailSingle(body, subject, model.Address));
                }
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
            }
        }


        public static async Task SendEmailThongBaoGiaiTrinhDotKeKhai(EmailViewModel model)
        {
            try
            {
                string body = ViewRenderer.RenderView("~/Views/EmailTemplate/EmailThongBaoGiaiTrinhDotKeKhai.cshtml", model);
                string subject = "Hệ thống PDTI: Thông báo giải trình số liệu của đợt kê khai";
                if (!string.IsNullOrEmpty(model.Address))
                {
                    Task.Run(() => sendEmailSingle(body, subject, model.Address));
                }
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
            }
        }

        public static async Task SendEmailThongBaoRaSoatDotKeKhai(EmailViewModel model)
        {
            try
            {
                string body = ViewRenderer.RenderView("~/Views/EmailTemplate/EmailThongBaoThongBaoRaSoatDotKeKhai.cshtml", model);
                string subject = "Hệ thống PDTI: Thông báo rà soát đợt kê khai";
                if (!string.IsNullOrEmpty(model.Address))
                {
                    Task.Run(() => sendEmailSingle(body, subject, model.Address));
                }
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
            }
        }

        public static async Task SendEmailThongBaoChotDotKeKhai(EmailViewModel model)
        {
            try
            {
                string body = ViewRenderer.RenderView("~/Views/EmailTemplate/EmailThongBaoThongBaoChotDotKeKhai.cshtml", model);
                string subject = "Hệ thống PDTI: Thông báo chờ chốt số liệu kê khai";
                if (!string.IsNullOrEmpty(model.Address))
                {
                    Task.Run(() => sendEmailSingle(body, subject, model.Address));
                }
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
            }
        }

        /// <summary>
        /// @author:duynn
        /// @since: 16/08/2021
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static async Task SendEmailThongBaoKetThucDotKeKhai(EmailViewModel model)
        {
            try
            {
                string body = ViewRenderer.RenderView("~/Views/EmailTemplate/EmailThongBaoThongBaoKetThucDotKeKhai.cshtml", model);
                string subject = "Hệ thống PDTI: Đợt kê khai đã kết thúc";
                if (!string.IsNullOrEmpty(model.Address))
                {
                    Task.Run(() => sendEmailSingle(body, subject, model.Address));
                }
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
            }
        }

        public static async Task SendEmailThongBaoXacNhanSoLieu(EmailViewModel model)
        {
            try
            {
                string body = ViewRenderer.RenderView("~/Views/EmailTemplate/EmailThongBaoXacNhanSoLieu.cshtml", model);
                string subject = "Hệ thống PDTI: Thông báo có một đơn vị đã xác nhận số liệu";
                if (!string.IsNullOrEmpty(model.Address))
                {
                    Task.Run(() => sendEmailSingle(body, subject, model.Address));
                }
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
            }
        }

        public static async Task SendEmailThongBaoGiaiTrinh(EmailViewModel model)
        {
            try
            {
                string body = ViewRenderer.RenderView("~/Views/EmailTemplate/EmailThongBaoGiaiTrinh.cshtml", model);
                string subject = "Hệ thống PDTI: Thông báo có một đơn vị gửi số liệu giải trình";
                if (!string.IsNullOrEmpty(model.Address))
                {
                    Task.Run(() => sendEmailSingle(body, subject, model.Address));
                }
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
            }
        }


        public static async Task SendEmailThongBaoTrinhSoLieuGiaiTrinh(EmailViewModel model)
        {
            try
            {
                string body = ViewRenderer.RenderView("~/Views/EmailTemplate/EmailThongBaoTrinhSoLieuGiaiTrinhLenLanhDao.cshtml", model);
                string subject = "Hệ thống PDTI: Thông báo chuyên viên đã trình số liệu giải trình";
                if (!string.IsNullOrEmpty(model.Address))
                {
                    Task.Run(() => sendEmailSingle(body, subject, model.Address));
                }
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
            }
        }


        public static async Task SendEmailThongBaoTrinhSoLieu(EmailViewModel model)
        {
            try
            {
                string body = ViewRenderer.RenderView("~/Views/EmailTemplate/EmailThongBaoTrinhSoLieuLenLanhDao.cshtml", model);
                string subject = "Hệ thống PDTI: Thông báo chuyên viên đã trình số liệu kê khai";
                if (!string.IsNullOrEmpty(model.Address))
                {
                    Task.Run(() => sendEmailSingle(body, subject, model.Address));
                }
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
            }
        }

        public static async Task SendEmailThongBaoTraVeSoLieuKeKhaiTuLanhDao(EmailViewModel model)
        {
            try
            {
                string body = ViewRenderer.RenderView("~/Views/EmailTemplate/EmailThongBaoTraVeSoLieuKeKhaiTuLanhDao.cshtml", model);
                string subject = "Hệ thống PDTI: Thông báo trả về số liệu kê khai";
                if (!string.IsNullOrEmpty(model.Address))
                {
                    Task.Run(() => sendEmailSingle(body, subject, model.Address));
                }
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
            }
        }


        public static async Task SendEmailThongBaoTraVeSoLieuGiaiTrinhTuLanhDao(EmailViewModel model)
        {
            try
            {
                string body = ViewRenderer.RenderView("~/Views/EmailTemplate/EmailThongBaoTraVeSoLieuGiaiTrinhTuLanhDao.cshtml", model);
                string subject = "Hệ thống PDTI: Thông báo trả về số liệu giải trình";
                if (!string.IsNullOrEmpty(model.Address))
                {
                    Task.Run(() => sendEmailSingle(body, subject, model.Address));
                }
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
            }
        }

        public static async Task SendEmailTraVeKhaoSat(EmailViewModel model)
        {
            try
            {
                string body = ViewRenderer.RenderView("~/Views/EmailTemplate/EmailTraVeKhaoSat.cshtml", model);
                string subject = "Hệ thống DTI: Thông báo yêu cầu điều chỉnh, bổ sung báo cáo";
                if (!string.IsNullOrEmpty(model.Address))
                {
                    SendEmailDTISupport(body, subject, model.Address);
                }
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
            }
        }

    }

}