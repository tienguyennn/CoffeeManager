using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models
{
    public class ModelStateViewModel
    {
        public string key { get; set; }
        public string value { get; set; }
        public List<string> error { get; set; }
    }
}