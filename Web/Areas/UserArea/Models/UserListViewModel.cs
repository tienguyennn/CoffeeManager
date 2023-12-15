using Service.AppUserService.Dto;
using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.Areas.UserArea.Models
{
    public class UserListViewModel
    {
        public List<SelectListItem> ListVaiTro { get; set; }
        public List<SelectListItem> ListDonVi { get; set; }
        public PageListResultBO<UserDto> ListUser { get; set; }
    }
}