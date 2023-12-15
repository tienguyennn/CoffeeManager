using com.ctc.wstx.evt;
using org.openxmlformats.schemas.wordprocessingml.x2006.main;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tesseract;
using Ghostscript.NET.Rasterizer;
using System.IO;

namespace Service.Common
{
    public static class OCRProvider
    {
        private static string _tessdata;
        public static void Init(string tessdata)
        {
            _tessdata = tessdata;
        }
        public static async Task<string> FromPdf(string pdfFilePath)
        {
            var task = Task.Run(() =>
            {
                var bitmaps = new List<Bitmap>();
                var allText = "";
                try
                {
                    using (var engine = new TesseractEngine(_tessdata, "vie", EngineMode.Default))
                    {
                        using (var rasterizer = new GhostscriptRasterizer())
                        {
                            rasterizer.Open(pdfFilePath);

                            int pageCount = rasterizer.PageCount;

                            for (int pageIndex = 1; pageIndex <= pageCount; pageIndex++)
                            {
                                var image = rasterizer.GetPage(96, pageIndex);
                                var bitmap = new Bitmap(image);
                                using (var page = engine.Process(bitmap))
                                {
                                    string text = page.GetText();
                                    allText += text;
                                }
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    File.AppendAllText(Path.Combine(_tessdata, "Logs", "log.txt"), ex.Message);
                }
                return allText;
            });
            return await task;

        }
    }
}
