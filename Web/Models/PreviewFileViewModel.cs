using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models
{
    public class PreviewFileViewModel
    {
        public int FileType { get; set; }
        public string FilePath { get; set; }
        public bool IsFileExisted { get; set; }
    }
}