using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Common
{
    public class ChartListData
    {
        public string label { get; set; }
        public List<int> data { get; set; }
    }
    public class ChartListDataSingle
    {
        public string label { get; set; }
        public int data { get; set; }
    }
    public class ChartListDataGroupSingle
    {
        public List<ChartListDataSingle> groupData { get; set; }
    }
    public class ChartListDataGroup
    {
        public string label { get; set; }
        public List<int> data { get; set; }
    }
    public class ChartLineDto
    {
        public string name { get; set; }
        public List<string> label { get; set; }
        public List<ChartListData> data { get; set; }
    }
    public class ChartDto
    {
        public string Label { get; set; }
        public decimal data { get; set; }
        public double percentData { get; set; }

        public static List<ChartDto> CalculatePercent(List<ChartDto> lstObj)
        {
            if (lstObj!=null)
            {
                var total = lstObj.Sum(x => x.data);
               
                foreach (var item in lstObj)
                {
                    item.percentData = (total==0?0:(double)Math.Round((item.data * 100) / total,2));
                }
            }
            return lstObj;
        }
    }
    public class ChartBarDto
    {
        public string name { get; set; }
        public List<string> label { get; set; }
        public List<int> data { get; set; }
    }

    public class ChartBarDtoDouble
    {
        public string name { get; set; }
        public double value { get; set; }
        public List<string> label { get; set; }
        public List<double> data { get; set; }
    }

    public class ChartBarMultiDto
    {
        public string name { get; set; }
        public List<string> label { get; set; }
        public List<ChartListDataGroup> data { get; set; }
    }
}
