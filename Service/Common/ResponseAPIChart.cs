using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Common
{
    public class ResponseAPIChart
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public object Param { get; set; }
        public List<object> Data { get; set; }
        public string CategoryField { get; set; }
        public List<string> ListSeries { get; set; }

        public string DataChart { get; set; }
        public ResponseAPIChart(bool st)
        {
            Status = st;
        }
        public ResponseAPIChart(bool st, string message)
        {
            Status = st;
            Message = message;
        }
        public void MessageFail(string mss)
        {
            Status = false;
            Message = mss;
        }
        public void MessageSuccess(string mss)
        {
            Status = true;
            Message = mss;
        }


    }
}
