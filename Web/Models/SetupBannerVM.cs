using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models
{
    public class SetupBannerVM
    {
        public long Id { get; set; }
        public string CodePage { get; set; }
        public DateTime? TimeShow { get; set; }
        public bool? IsShow { get; set; }
        public long IdBanner { get; set; }
        public int OrderNumber { get; set; }
    }
}