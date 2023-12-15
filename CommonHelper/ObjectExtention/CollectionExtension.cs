using OfficeOpenXml.FormulaParsing.Excel.Functions.Information;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace CommonHelper.ObjectExtention
{
    public static class CollectionExtension
    {

        public static int GetQuyHienTai()
        {
            var currentDate = DateTime.Now;
            var result = 1;
            if (currentDate.Month >= 1 && currentDate.Month <= 3)
            {
                result = 1;
            }
            else if (currentDate.Month >= 4 && currentDate.Month <= 6)
            {
                result = 2;
            }
            else if (currentDate.Month >= 7 && currentDate.Month <= 9)
            {
                result = 3;
            }
            else
            {
                result = 4;
            }
            return result;
        }

        public static List<SelectListItem> GetDropdownThang(int? selected = 0)
        {
            return Enumerable.Range(1, 12).Select(x => new SelectListItem()
            {
                Text = "Tháng " + x,
                Value = x.ToString(),
            }).ToList();
        }
        public static List<SelectListItem> GetDropdownNam(int? selected = 0)
        {
            return Enumerable.Range(0, 5).Select(x => new SelectListItem()
            {
                Text = "Năm " + (DateTime.Now.Year - x),
                Value = (DateTime.Now.Year - x).ToString(),
            }).ToList();
        }


        public static List<SelectListItem> GetListQuy(int selected = 0)
        {
            var currentDate = DateTime.Now;
            var result = new List<SelectListItem>();

            if (selected > 0)
            {
                result.Add(new SelectListItem()
                {
                    Value = "1",
                    Text = "Quý I",
                    Selected = (selected > 0 && selected == 1)
                });

                result.Add(new SelectListItem()
                {
                    Value = "2",
                    Text = "Quý II",
                    Selected = (selected > 0 && selected == 2)
                });

                result.Add(new SelectListItem()
                {
                    Value = "3",
                    Text = "Quý III",
                    Selected = (selected > 0 && selected == 3)
                });

                result.Add(new SelectListItem()
                {
                    Value = "4",
                    Text = "Quý IV",
                    Selected = (selected > 0 && selected == 4)
                });
            }
            else
            {
                result.Add(new SelectListItem()
                {
                    Value = "1",
                    Text = "Quý I",
                    Selected = (currentDate.Month >= 1 && currentDate.Month <= 3)
                });

                result.Add(new SelectListItem()
                {
                    Value = "2",
                    Text = "Quý II",
                    Selected = (currentDate.Month >= 4 && currentDate.Month <= 6)
                });

                result.Add(new SelectListItem()
                {
                    Value = "3",
                    Text = "Quý III",
                    Selected = (currentDate.Month >= 7 && currentDate.Month <= 9)
                });

                result.Add(new SelectListItem()
                {
                    Value = "4",
                    Text = "Quý IV",
                    Selected = currentDate.Month >= 10
                });
            }

            return result;
        }

        public static List<SelectListItem> GetListNam(int selected = 0)
        {
            var currentYear = DateTime.Now.Year;
            var result = new List<SelectListItem>();
            if (selected > 0)
            {
                for (int i = currentYear; i >= currentYear - 5; i--)
                {
                    result.Add(new SelectListItem()
                    {
                        Value = i.ToString(),
                        Text = "Năm " + i,
                        Selected = (selected > 0 && selected == i)
                    });
                }
            }
            else
            {
                for (int i = currentYear; i >= currentYear - 5; i--)
                {
                    result.Add(new SelectListItem()
                    {
                        Value = i.ToString(),
                        Text = "Năm " + i,
                        Selected = currentYear == i
                    });
                }
            }
            return result;
        }

        public static List<SelectListItem> GetDropdown<T>(this IEnumerable<T> data, string displayMember, string valueMember, object selected = null)
        {
            Type objType = typeof(T);
            List<SelectListItem> result = new List<SelectListItem>();
            if (string.IsNullOrEmpty(displayMember) == false && string.IsNullOrEmpty(valueMember) == false)
            {
                result = data.ToList().Select(x => new SelectListItem()
                {
                    Value = objType.GetProperty(valueMember).GetValue(x).ToString(),
                    Text = objType.GetProperty(displayMember).GetValue(x).ToString(),
                    Selected = (selected != null) && selected.Equals(objType.GetProperty(valueMember).GetValue(x))
                }).ToList();
            }
            return result;
        }

        public static IEnumerable<SelectListItem> GetDropDownMutiple<T>(this IEnumerable<T> source, string displayMember, string valueMember, object[] selected = null)
        {
            Type objType = typeof(T);
            IEnumerable<SelectListItem> result = new List<SelectListItem>();
            if (string.IsNullOrEmpty(displayMember) == false && string.IsNullOrEmpty(valueMember) == false)
            {
                result = source.Select(x => new SelectListItem()
                {
                    Value = objType.GetProperty(valueMember).GetValue(x).ToString(),
                    Text = objType.GetProperty(displayMember).GetValue(x).ToString(),
                    Selected = (selected != null) && selected.Contains(objType.GetProperty(valueMember).GetValue(x))
                }).OrderBy(x => x.Text);
            }
            return result;
        }

        public static TSource FirstOrEmpty<TSource>(this IEnumerable<TSource> source)
        {
            if (source == null || source.Any() == false)
            {
                return (TSource)Activator.CreateInstance(typeof(TSource));
            }
            else
            {
                return source.First();
            }
        }

        public static List<SelectListItem> ToDropdownList(this List<string> source, List<string> selectedValues = null)
        {
            var result = new List<SelectListItem>();
            selectedValues = selectedValues ?? new List<string>();

            if (source != null && source.Any())
            {
                result = source.Select(x => new SelectListItem()
                {
                    Value = x,
                    Text = x,
                    Selected = selectedValues.Any(item => item.Equals(x))
                }).ToList();
            }
            return result;
        }

        public static string ToCommaSeperatedString<T>(this IEnumerable<T> source) where T : IComparable, IFormattable, IConvertible
        {
            if (source != null)
            {
                var result = string.Join(",", source.ToArray());
                return result;
            }
            return string.Empty;
        }

        public static List<T> ToSingleList<T>(this T item)
        {
            return new List<T>() { item };
        }

        /// <summary>
        /// @author:duynn
        /// @since: 17/08/2020
        /// </summary>
        /// <param name="selectedMonth"></param>
        /// <returns></returns>
        public static List<SelectListItem> GetListThang(int selectedMonth = 0)
        {
            var result = new List<SelectListItem>();
            for (int i = 1; i <= 12; i++)
            {
                result.Add(new SelectListItem()
                {
                    Value = i.ToString(),
                    Text = "Tháng " + i,
                    Selected = selectedMonth == i
                });
            }
            return result;
        }

        public static List<SelectListItem> GetDropdown(this List<SelectListItem> list, string selected)
        {
            var result = new List<SelectListItem>();
            foreach (var item in list)
            {
                if (item.Value == selected)
                {
                    item.Selected = true;
                }
                else
                {
                    item.Selected = false;
                }
                result.Add(item);
            }
            return result;
        }

        public static List<SelectListItem> GetDropdown(this List<SelectListItem> list, List<string> selected)
        {
            var result = new List<SelectListItem>();
            foreach (var item in list)
            {
                if (selected.Contains(item.Value))
                {
                    item.Selected = true;
                }
                result.Add(item);
            }
            return result;
        }


        public static List<List<T>> ChunkBy<T>(this List<T> source, int chunkSize)
        {
            return source
                .Select((x, i) => new { Index = i, Value = x })
                .GroupBy(x => x.Index / chunkSize)
                .Select(x => x.Select(v => v.Value).ToList())
                .ToList();
        }


        public static IEnumerable<T> TakeLast<T>(this IEnumerable<T> source, int nums)
        {
            return source.Skip(Math.Max(0, source.Count() - nums));
        }
    }
}
