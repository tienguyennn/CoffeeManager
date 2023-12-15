using Model.Entities;
using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Areas.UserArea.Models
{
    public class LogKhoaTruyCapViewModel
    {
        public long IdUser { get; set; }
        public string UserName { get; set; }
        public PageListResultBO<Audit> DataKhoaTruyCap { get; set; }
    }
}