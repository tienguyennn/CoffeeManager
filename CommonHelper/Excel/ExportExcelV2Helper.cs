using CommonHelper.ObjectExtention;
using OfficeOpenXml;
using OfficeOpenXml.Table;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;


namespace CommonHelper.Excel
{
    public class ExportExcelV2Helper
    {
        /// <summary>
        /// Chuyển đổi kiểu Nullable
        /// </summary>
        /// <param name="propertyInfo"></param>
        /// <returns></returns>
        private static Type GetTypeExcelSupport(PropertyInfo propertyInfo)
        {
            var typeObj = propertyInfo.PropertyType;
            if (typeObj.IsGenericType && typeObj.GetGenericTypeDefinition() == typeof(Nullable<>))
            {
                return Nullable.GetUnderlyingType(typeObj);
            }

            return typeObj;

        }

        public static byte[] ExportQlChungThuSo<T>(List<T> Data, List<Tuple<string, string, bool>> lstTextCustom = null, bool noStyle = false)
        {
            try
            {
                var DataFile = new DataTable();

                var memoryStream = new MemoryStream();

                using (var excelPackage = new ExcelPackage(memoryStream))
                {

                }



            }
            catch { }


            return null;
        }

        public static byte[] Export<T>(List<T> Data, List<Tuple<string, string, bool>> lstTextCustom = null,bool noStyle = false) where T : class
        {

            try
            {
                var FileData = new DataTable();

                var memoryStream = new MemoryStream();
                using (var excelPackage = new ExcelPackage(memoryStream))
                {
                    var worksheet = excelPackage.Workbook.Worksheets.Add("Sheet1");
                    DataTable Dt = new DataTable();
                    var listProperty = typeof(T).GetProperties();

                    for (int i = 0; i < listProperty.Count(); i++)
                    {
                        var displayNameObj = listProperty[i].GetAttribute<DisplayNameAttribute>(false);
                        var name = displayNameObj != null ? displayNameObj.DisplayName : listProperty[i].Name;
                        Dt.Columns.Add(name, GetTypeExcelSupport(listProperty[i]));
                    }

                    foreach (var dataitem in Data)
                    {
                        DataRow row = Dt.NewRow();
                        for (int i = 0; i < listProperty.Count(); i++)
                        {
                            var val = listProperty[i].GetValue(dataitem);
                            if (val != null)
                            {
                                row[i] = val;
                            }

                        }
                        Dt.Rows.Add(row);

                    }
                    worksheet.DefaultColWidth = 20;
                    //worksheet.DefaultRowHeight = 20;
                    worksheet.Cells.Style.WrapText = true;
                    worksheet.Cells.AutoFitColumns();
                    if (noStyle)
                    {
                        worksheet.Cells["A5"].LoadFromDataTable(Dt, true);
                    }
                    else
                    {
                        worksheet.Cells["A5"].LoadFromDataTable(Dt, true, TableStyles.Medium13);
                    }
                    worksheet.Cells.Style.Font.SetFromFont(new System.Drawing.Font("Segoe UI",13));
                    worksheet.Row(5).Style.Font.Bold = true;
                    for (int i = 0; i < Dt.Columns.Count; i++)
                    {
                        if (Dt.Columns[i].DataType == typeof(DateTime?) || Dt.Columns[i].DataType == typeof(DateTime))
                        {
                            worksheet.Column(i + 1).Style.Numberformat.Format = "dd/MM/yyyy";
                        }
                    }
                    if (lstTextCustom != null)
                    {
                        foreach (var item in lstTextCustom)
                        {
                            var match = Regex.Match(item.Item1, @"^([A-Z]+)(\d+):([A-Z]+)(\d+)$", RegexOptions.IgnoreCase);
                            if (match.Success)
                            {
                                worksheet.Cells[item.Item1].Merge = true;
                                worksheet.Cells[item.Item1].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                                worksheet.Cells[item.Item1].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
                                worksheet.Cells[item.Item1].Style.Font.Size = 20;
                            }
                            worksheet.Cells[item.Item1].Value = item.Item2;
                            if (item.Item3)
                            {
                                worksheet.Cells[item.Item1].Style.Font.Bold = true;
                            }
                        }
                    }
                    return excelPackage.GetAsByteArray();

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return null;
        }

        public static byte[] ExportString(List<string> header, List<List<string>> Data)
        {

            try
            {
                var FileData = new DataTable();

                var memoryStream = new MemoryStream();
                using (var excelPackage = new ExcelPackage(memoryStream))
                {
                    var worksheet = excelPackage.Workbook.Worksheets.Add("Sheet1");
                    DataTable Dt = new DataTable();

                    for (int i = 0; i < header.Count(); i++)
                    {
                        var displayNameObj = header[i];

                        Dt.Columns.Add(displayNameObj, typeof(string));
                    }

                    foreach (var dataitem in Data)
                    {
                        DataRow row = Dt.NewRow();
                        for (int i = 0; i < header.Count(); i++)
                        {
                            var val = dataitem[i];
                            if (val != null)
                            {
                                row[i] = val;
                            }

                        }
                        Dt.Rows.Add(row);

                    }
                    //worksheet.Cells.AutoFitColumns();
                    worksheet.DefaultColWidth = 20;
                    worksheet.Cells["A1"].LoadFromDataTable(Dt, true, TableStyles.None);

                    return excelPackage.GetAsByteArray();

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return null;
        }

          }
}
