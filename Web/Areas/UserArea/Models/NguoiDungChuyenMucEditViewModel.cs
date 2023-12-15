using Model.Entities;
using Model.IdentityEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.Areas.UserArea.Models
{
    public class NguoiDungChuyenMucEditViewModel
    {
        public AppUser EntityUser { get; set; }
        public List<SelectListItem> GroupChuyenMuc { get; set; }
    }
}