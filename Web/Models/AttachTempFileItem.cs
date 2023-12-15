using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models
{
    public class AttachTempFileItem
    {
        public string Name { get; set; }
        public string Path { get; set; }
        public int Size { get; set; }
        public string Extension { get; set; }
        public string Note { get; set; }
        public bool Status { get; set; }
    }
}