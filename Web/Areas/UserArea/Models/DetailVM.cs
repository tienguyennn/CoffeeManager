using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Model.IdentityEntities;
using Service.AppUserService.Dto;

namespace Web.Areas.UserArea.Models
{
    public class DetailVM
    {
       public UserDto users { get; set; }
    }
}