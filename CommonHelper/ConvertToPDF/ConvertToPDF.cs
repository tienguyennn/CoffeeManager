using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Office.Interop.Word;

namespace CommonHelper.ConvertToPDF
{
    public class ConvertToPDF
    {
        /// <summary>
        /// @author:duynn
        /// @since: 19/07/2019
        /// </summary>
        /// <param name="wordFileName"></param>
        /// <param name="pdfFileName"></param>
        public static void ConvertWordToPDF(string wordFileName, string pdfFileName)
        {
            Microsoft.Office.Interop.Word.Application wordApp =
            new Microsoft.Office.Interop.Word.Application();
            object missingValue = System.Reflection.Missing.Value;

            wordApp.Visible = false;
            wordApp.ScreenUpdating = false;
            // Cast as Object for word Open method
          

            object filename = (object)wordFileName;
            // Use the dummy value as a placeholder for optional arguments

            Document doc = wordApp.Documents.Open(ref filename, ref missingValue,
             ref missingValue, ref missingValue,
             ref missingValue, ref missingValue,
             ref missingValue, ref missingValue,
             ref missingValue, ref missingValue,
             ref missingValue, ref missingValue,
             ref missingValue, ref missingValue,
             ref missingValue, ref missingValue);

            doc.Activate();

            object outputFileName = pdfFileName;
            object fileFormat = WdSaveFormat.wdFormatPDF;

            // Save document into PDF Format
            doc.SaveAs(ref outputFileName, ref fileFormat, ref missingValue,
             ref missingValue, ref missingValue,
             ref missingValue, ref missingValue,
             ref missingValue, ref missingValue,
             ref missingValue, ref missingValue,
             ref missingValue, ref missingValue,
             ref missingValue, ref missingValue, ref missingValue);

            object saveChanges = WdSaveOptions.wdDoNotSaveChanges;
            ((_Document)doc).Close(ref saveChanges, ref missingValue, ref missingValue);
            doc = null;
            // word has to be cast to type _Application so that it will find
            // the correct Quit method.
            ((_Application)wordApp).Quit(ref missingValue, ref missingValue, ref missingValue);
            wordApp = null;
        }

        /// <summary>
        /// @author:duynn
        /// @since: 19/07/2019
        /// </summary>
        /// <param name="workbookPath"></param>
        /// <param name="outputPath"></param>
        public static void ConvertExcelToPDF(string workbookPath, string outputPath)
        {
            // Create COM Objects
            Microsoft.Office.Interop.Excel.Application excelApplication;
            Microsoft.Office.Interop.Excel.Workbook excelWorkbook;

            // Create new instance of Excel
            excelApplication = new Microsoft.Office.Interop.Excel.Application();

            // Make the process invisible to the user
            excelApplication.ScreenUpdating = false;

            // Make the process silent
            excelApplication.DisplayAlerts = false;

            // Open the workbook that you wish to export to PDF
            excelWorkbook = excelApplication.Workbooks.Open(workbookPath);

            // If the workbook failed to open, stop, clean up, and bail out
            if (excelWorkbook == null)
            {
                excelApplication.Quit();

                excelApplication = null;
                excelWorkbook = null;
            }

            /**
             * Call Excel's native export function (valid in Office 2007 and Office 2010, AFAIK)
             */
            excelWorkbook.ExportAsFixedFormat(Microsoft.Office.Interop.Excel.XlFixedFormatType.xlTypePDF, outputPath);

            /**
             * Close the workbook, quit the Excel, and clean up regardless of the results...
             */
            excelWorkbook.Close();
            excelApplication.Quit();

            excelApplication = null;
            excelWorkbook = null;

        }
    }
}
