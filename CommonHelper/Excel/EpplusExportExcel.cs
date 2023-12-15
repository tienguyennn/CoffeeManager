using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Office.Interop.Excel;
using System.Drawing;
using System.IO;
using System.Runtime.InteropServices;
using System.Diagnostics;
using OfficeOpenXml;
using OfficeOpenXml.Table;
using TableStyles = OfficeOpenXml.Table.TableStyles;
using System.Reflection;
using OfficeOpenXml.Drawing;
using OfficeOpenXml.Style;
using System.Web.Configuration;

namespace CommonHelper.Excel
{
    public class ExcelKiller
    {
        [DllImport("user32.dll")]
        static extern int GetWindowThreadProcessId(int hWnd, out int lpdwProcessId);
        public static void TerminateExcelProcess(Application excelApp)
        {
            int id;
            GetWindowThreadProcessId(excelApp.Hwnd, out id);
            var process = Process.GetProcessById(id);
            if (process != null)
            {
                process.Kill();
            }
        }
    }

    public class ResponseExport
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public string FileName { get; set; }
        public string PathStore { get; set; }
        public ResponseExport(bool status)
        {
            Status = status;
        }
    }

    public class EpplusExcel<T> where T : class
    {
        private static string UploadFolderPath = WebConfigurationManager.AppSettings["UploadFolderPath"];
        public int RowHeight { get; set; }
        public string FileName { set; get; }
        public int StartColumn { set; get; }
        public int StartRow { set; get; }
        public int[] LeftAignColumnIndex { set; get; } //cấu hình cột căn giữa
        public int[] CenterRowIndex { get; set; } // cấu hình hàng căn giữa
        public Dictionary<string, string> InstanceProperties { set; get; }

        public bool IsHasCalculateTotalRow { get; set; } //có hàng tính tổng không
        public string TotalValue { get; set; } //giá trị của hàng tính tổng
        public string TotalNameRange { get; set; } //địa chỉ để tạo ô tiêu đề tổng
        public string TotalValueRange { get; set; } //địa chỉ để tạo hàng có tiêu đề là tổng

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
                var columnCount = this.InstanceProperties.Count;

                //int colIndex = 1;

                //int Height = 120;
                //int Width = 100;

                for (int i = 0; i < this.InstanceProperties.Count; i++)
                {
                    workSheet.Cells[this.StartRow, i + this.StartColumn].Value = this.InstanceProperties.ElementAt(i).Value;
                }
                for (int row = 0; row < rowCount; row++)
                {
                    var item = data[row];
                    for (int column = 0; column < columnCount; column++)
                    {
                        KeyValuePair<string, string> keyValue = this.InstanceProperties.ElementAt(column);

                        //if (row == 0)
                        //{
                        //    //workSheet.Cells[this.StartRow, column + this.StartColumn].Value = keyValue.Value;
                        //}

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
                            else if (propertyName == "STT")
                            {
                                cellValue = (row + 1);
                            }
                        }
                        workSheet.Cells[this.StartRow + row + 1, column + this.StartColumn].Value = cellValue;
                        workSheet.Row(this.StartRow + row + 1).Height = RowHeight > 0 ? RowHeight : 30;
                    }
                }
                //định dạng biểu mẫu
                if (formatWorkSheet != null)
                {
                    workSheet = formatWorkSheet(workSheet, this.FileName);
                }

                //tạo border cho tất cả các ô có chứa dữ liệu
                for (int row = this.StartRow; row <= (this.StartRow + data.Count); row++)
                {
                    for (int column = this.StartColumn; column <= (this.StartColumn + this.InstanceProperties.Count) - 1; column++)
                    {
                        workSheet.Cells[row, column].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin, System.Drawing.Color.Black);
                    }
                }

                ExcelRange dataRangeRowStart = workSheet.SelectedRange[this.StartRow, this.StartColumn, this.StartRow, (this.StartColumn + this.InstanceProperties.Count) - 1];
                dataRangeRowStart.Style.Font.Bold = true;
                dataRangeRowStart.Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
                dataRangeRowStart.Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                //căn giữa cho toàn bộ sheet

                ExcelRange dataRange = workSheet.SelectedRange[this.StartRow, this.StartColumn, (this.StartRow + data.Count), (this.StartColumn + this.InstanceProperties.Count) - 1];
                //dataRange.Style.Font.Bold = true;
                dataRange.Style.Font.Size = 12;
                dataRange.Style.WrapText = true;
                dataRange.Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
                dataRange.Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                if (this.LeftAignColumnIndex != null && this.LeftAignColumnIndex.Count() > 0)
                {
                    foreach (var column in this.LeftAignColumnIndex)
                    {
                        ExcelRange centerRange = workSheet.SelectedRange[this.StartRow, column, (this.StartRow + data.Count), column];
                        centerRange.Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    }

                    workSheet.Row(6).Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                }
                if (this.CenterRowIndex != null && this.CenterRowIndex.Count() > 0)
                {
                    foreach (var row in this.CenterRowIndex)
                    {
                        workSheet.Row(row).Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    }
                }

                if (this.IsHasCalculateTotalRow)
                {
                    ExcelRange titleRange = workSheet.SelectedRange[this.TotalNameRange];
                    titleRange.Value = null;
                    titleRange.Merge = true;
                    titleRange.Value = "TỔNG";
                    titleRange.Style.Font.Size = 14;
                    titleRange.Style.Font.Bold = true;
                    titleRange.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    titleRange.Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
                    titleRange.Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    titleRange.Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin, System.Drawing.Color.Black);

                    ExcelRange valueRange = workSheet.SelectedRange[this.TotalValueRange];
                    valueRange.Value = null;
                    valueRange.Merge = true;
                    valueRange.Value = this.TotalValue;
                    valueRange.Style.Font.Size = 14;
                    valueRange.Style.Font.Bold = true;
                    valueRange.Style.Font.Color.SetColor(System.Drawing.Color.Black);
                    valueRange.Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
                    valueRange.Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    valueRange.Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin, System.Drawing.Color.Black);
                }
                excelPackage.Save();
                return excelPackage.Stream;
            }
        }


        public Stream CreateExcelFileWithImage(List<T> data, Func<ExcelWorksheet, string, ExcelWorksheet> formatWorkSheet)
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
                var columnCount = this.InstanceProperties.Count;

                int colIndex = 1;

                int Height = 100;
                int Width = 120;

                for (int row = 0; row < rowCount; row++)
                {
                    var item = data[row];
                    for (int column = 0; column < columnCount; column++)
                    {
                        KeyValuePair<string, string> keyValue = this.InstanceProperties.ElementAt(column);

                        if (row == 0)
                        {
                            workSheet.Cells[this.StartRow, column + this.StartColumn].Value = keyValue.Value;
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
                                    if (propertyName == "ANH_PATH" || propertyName == "PATH_ANH")
                                    {
                                        cellValue = property.GetValue(data[row]) ?? string.Empty;
                                        if (cellValue == null || cellValue.ToString() == "hinhanh/users.jpg" || cellValue == "")
                                        {
                                            cellValue = "";
                                        }
                                        else
                                        {
                                            if (File.Exists(UploadFolderPath + "/" + cellValue))
                                            {
                                                Image img = Image.FromFile(UploadFolderPath + "/" + cellValue);
                                                ExcelPicture pic = workSheet.Drawings.AddPicture("hocvien" + row + 1, img);
                                                pic.SetPosition(row + 6, 0, colIndex, 0);
                                                //pic.SetPosition(PixelTop, PixelLeft);
                                                pic.SetSize(Height, Width);
                                                //pic.SetSize(40);

                                                workSheet.Protection.IsProtected = false;
                                                workSheet.Protection.AllowSelectLockedCells = false;
                                            }


                                        }
                                        cellValue = "";

                                    }
                                    else
                                    {
                                        cellValue = property.GetValue(data[row]) ?? string.Empty;
                                    }

                                }
                            }
                            else if (propertyName == "STT")
                            {
                                cellValue = (row + 1);
                            }
                        }
                        workSheet.Cells[this.StartRow + row + 1, column + this.StartColumn].Value = cellValue;
                        workSheet.Row(this.StartRow + row + 1).Height = 100;
                    }
                }
                //định dạng biểu mẫu
                if (formatWorkSheet != null)
                {
                    workSheet = formatWorkSheet(workSheet, this.FileName);
                }

                //tạo border cho tất cả các ô có chứa dữ liệu
                for (int row = this.StartRow; row <= (this.StartRow + data.Count); row++)
                {
                    for (int column = this.StartColumn; column <= (this.StartColumn + this.InstanceProperties.Count) - 1; column++)
                    {
                        workSheet.Cells[row, column].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin, System.Drawing.Color.Black);
                    }
                }

                ExcelRange dataRangeRowStart = workSheet.SelectedRange[this.StartRow, this.StartColumn, this.StartRow, (this.StartColumn + this.InstanceProperties.Count) - 1];
                dataRangeRowStart.Style.Font.Bold = true;
                dataRangeRowStart.Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
                dataRangeRowStart.Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                //căn giữa cho toàn bộ sheet

                ExcelRange dataRange = workSheet.SelectedRange[this.StartRow, this.StartColumn, (this.StartRow + data.Count), (this.StartColumn + this.InstanceProperties.Count) - 1];
                //dataRange.Style.Font.Bold = true;
                dataRange.Style.Font.Size = 12;
                dataRange.Style.WrapText = true;
                dataRange.Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
                dataRange.Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                if (this.LeftAignColumnIndex != null && this.LeftAignColumnIndex.Count() > 0)
                {
                    foreach (var column in this.LeftAignColumnIndex)
                    {
                        ExcelRange centerRange = workSheet.SelectedRange[this.StartRow, column, (this.StartRow + data.Count), column];
                        centerRange.Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    }

                    workSheet.Row(6).Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                }
                if (this.CenterRowIndex != null && this.CenterRowIndex.Count() > 0)
                {
                    foreach (var row in this.CenterRowIndex)
                    {
                        workSheet.Row(row).Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    }
                }



                excelPackage.Save();
                return excelPackage.Stream;
            }
        }

        public Stream CreateExcelFile(List<List<string>> data, Func<ExcelWorksheet, string, ExcelWorksheet> formatWorkSheet)
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
                //var columnCount = this.InstanceProperties.Count;

                for (int row = 0; row < rowCount; row++)
                {
                    var item = data[row];
                    int columnCount = data[row].Count;
                    for (int column = 0; column < columnCount; column++)
                    {
                        workSheet.Cells[row + 1, column + 1].Value = data[row][column].Replace("<br/>", string.Empty);
                        workSheet.Cells[row + 1, column + 1].Style.Border.BorderAround(OfficeOpenXml.Style.ExcelBorderStyle.Thin, System.Drawing.Color.Black);
                        workSheet.Cells.Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
                        workSheet.Cells.Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;
                    }
                }
                //định dạng biểu mẫu
                if (formatWorkSheet != null)
                {
                    workSheet = formatWorkSheet(workSheet, this.FileName);
                }
                excelPackage.Save();
                return excelPackage.Stream;
            }
        }
    }
}
