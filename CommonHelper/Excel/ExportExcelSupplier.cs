using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Runtime.InteropServices;
using System.Diagnostics;
using MSExcel = Microsoft.Office.Interop.Excel;
using MSExcelApp = Microsoft.Office.Interop.Excel.Application;
using MSExcelWorkBook = Microsoft.Office.Interop.Excel.Workbook;
using MSExcelWorkSheet = Microsoft.Office.Interop.Excel.Worksheet;
using System.Reflection;
using Microsoft.Office.Interop.Excel;
using OfficeOpenXml;

namespace CommonHelper.Excel
{
    public class ExportExcelSupplier<T> where T : class
    {
        public List<string> propertyColumns { set; get; } //danh sách thuộc tính đối tượng cần kết xuất
        public int startCell { set; get; } //cột bắt đầu
        public int startRow { set; get; } //cột kết thúc

        public string templateFilePath { set; get; } //đường dẫn file mẫu
        public string outputFolderPath { set; get; } //thư mục chứa file kết quả
        public string fileName { set; get; } //tên file kết quả

        public MSExcelApp app { set; get; }
        public MSExcelWorkBook workBook { set; get; }
        public MSExcelWorkSheet workSheet { set; get; }

        //open workbook
        public bool OpenWorkBook()
        {
            if (string.IsNullOrEmpty(templateFilePath) == false || File.Exists(templateFilePath))
            {
                app = new MSExcelApp();
                workBook = app.Workbooks.Open(templateFilePath);
                workSheet = workBook.ActiveSheet;
                return true;
            }
            else
            {
                return false;
            }
        }

        public ExportExcelResult SaveAndCloseWorkBook()
        {
            ExportExcelResult exportResult = new ExportExcelResult();
            if (string.IsNullOrEmpty(fileName))
            {
                exportResult.exportResultMessage = "Vui lòng nhập tên file";
            }
            if (string.IsNullOrEmpty(outputFolderPath) || Directory.Exists(outputFolderPath) == false)
            {
                exportResult.exportResultMessage = "Thư mục kết xuất không tồn tại!";
                return exportResult;
            }

            if (app != null && workBook != null)
            {
                string outputFilePath = Path.Combine(outputFolderPath, fileName);
                if (File.Exists(outputFilePath))
                {
                    fileName = SetNewFileName(fileName);
                    outputFilePath = Path.Combine(outputFolderPath, fileName);
                }

                workBook.SaveAs(outputFilePath);
                workBook.Close();

                app.DisplayAlerts = false;
                app.Quit();
                ExcelKiller.TerminateExcelProcess(app);

                exportResult.exportSuccess = true;
                exportResult.exportResultFileName = fileName;
            }

            return exportResult;
        }

        //fill data
        public void FillTableData(List<T> objectsToExport)
        {
            Type objectType = typeof(T);
            int rowCount = objectsToExport.Count();
            for (int row = 0; row < rowCount; row++)
            {
                for (int col = 0; col < propertyColumns.Count(); col++)
                {
                    string propertyName = propertyColumns[col];
                    object cellValue = string.Empty;
                    if (string.IsNullOrEmpty(propertyName) == false)
                    {
                        PropertyInfo property = objectType.GetProperty(propertyName);
                        if (property != null)
                        {
                            cellValue = property.GetValue(objectsToExport[row]) ?? string.Empty;
                        }
                        else
                        {
                            //trường hợp số stt
                            cellValue = (row + 1);
                        }
                    }
                    workSheet.Cells[startRow + row, startCell + col] = cellValue;
                }
            }
        }

        public void WrapTextAndAutoFitRange(Range range)
        {
            range.Columns.AutoFit();
            range.WrapText = true;
        }
        public void SetTextCenterRange(Range range)
        {
            range.Cells.HorizontalAlignment = XlHAlign.xlHAlignCenter;
            range.Cells.VerticalAlignment = XlHAlign.xlHAlignCenter;
        }

        public void AlignRange(Range range)
        {
            range.Columns.AutoFit();
            range.WrapText = true;
            range.Cells.HorizontalAlignment = XlHAlign.xlHAlignCenter;
            range.Cells.VerticalAlignment = XlHAlign.xlHAlignCenter;
        }

        //tạo viền
        public void SetBorderRange(Range range)
        {
            range.Cells.Borders.LineStyle = XlLineStyle.xlContinuous;
        }

        private string SetNewFileName(string oldFileName)
        {
            string result = string.Empty;
            result = oldFileName.Replace(".xlsx", string.Empty)
                    .Replace(".xls", string.Empty)
                    .Replace(".xlt", string.Empty)
                    .Replace(".xlm", string.Empty)
                    .Replace(".xlsm", string.Empty)
                    .Replace(".xltx", string.Empty)
                    .Replace("xltm", string.Empty)
                    .Replace("xlsb", string.Empty)
                    .Replace("xla", string.Empty)
                    .Replace("xlam", string.Empty)
                    .Replace("xll", string.Empty)
                    .Replace("xlw", string.Empty) + DateTime.Now.ToString("-ddMMyyyy_hhmmss") + ".xlsx";
            return result;
        }
    }

    public class EPPlusSupplier<T> where T : class
    {
        public string fileName { set; get; }
        public int startColumn { set; get; } //cột bắt đầu đổ dữ liệu
        public int startRow { set; get; } //dòng bắt đầu đổ dữ liệu

        public Dictionary<string, string> properties { set; get; }

        public Stream CreateExcelFile(List<T> data, Func<ExcelWorksheet, string, ExcelWorksheet> formatWorkSheet)
        {
            Type objectType = typeof(T);
            using (var excelPackage = new ExcelPackage(new MemoryStream()))
            {
                excelPackage.Workbook.Properties.Author = "Author";

                //tạo title cho file excel
                excelPackage.Workbook.Properties.Title = "Title";

                //commment
                excelPackage.Workbook.Properties.Comments = "Comments";

                //add sheet vào fiel excel
                excelPackage.Workbook.Worksheets.Add("Sheet 1");

                //lấy sheet vừa mới tạo để thao tác
                var workSheet = excelPackage.Workbook.Worksheets[1];

                var rowCount = data.Count;
                var columnCount = this.properties.Count;

                for (int row = 0; row < rowCount; row++)
                {
                    var item = data[row];
                    for (int column = 0; column < columnCount; column++)
                    {
                        KeyValuePair<string, string> keyValue = this.properties.ElementAt(column);

                        if (row == 0)
                        {
                            workSheet.Cells[startRow, column + startColumn].Value = keyValue.Value;
                        }

                        string propertyName = keyValue.Key;
                        object cellValue = string.Empty;
                        if (!string.IsNullOrEmpty(propertyName))
                        {
                            PropertyInfo property = objectType.GetProperty(propertyName);
                            if (property != null)
                            {
                                if (property.PropertyType == typeof(DateTime?) || property.PropertyType == typeof(DateTime))
                                {
                                    cellValue = string.Format("{0:dd/MM/yyyy}", property.GetValue(data[row]));
                                }
                                else
                                {
                                    cellValue = property.GetValue(data[row]) ?? string.Empty;
                                }
                            }
                            else
                            {
                                cellValue = (row + 1);
                            }
                        }
                        workSheet.Cells[startRow + row + 1, column + startColumn].Value = cellValue;
                        workSheet.Row(startRow + row + 1).Height = 30;
                    }
                }
                //định dạng biểu mẫu
                if (formatWorkSheet != null)
                {
                    workSheet = formatWorkSheet(workSheet, this.fileName);
                }
                workSheet.SelectedRange[startRow, startColumn, (startRow + data.Count), (startColumn + this.properties.Count) - 1].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
                workSheet.SelectedRange[startRow, startColumn, (startRow + data.Count), (startColumn + this.properties.Count) - 1].Style.WrapText = true;
                excelPackage.Save();

                return excelPackage.Stream;
            }
        }
    }

    public class ExportExcelResult
    {
        public bool exportSuccess { set; get; }
        public string exportResultMessage { set; get; }
        public string exportResultUrl { set; get; }
        public string exportResultFileName { set; get; }
        public ExportExcelResult()
        {
            exportResultMessage = string.Empty;
            exportResultUrl = string.Empty;
        }
    }
}
