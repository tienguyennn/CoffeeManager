using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
namespace Service.AppUserService.Dto
{
    public class AppUserImportDto
    {
        [DisplayName("Họ và tên")]
        public string FullName { get; set; }
        [Required]
        [DisplayName("Tên đăng nhập")]
        public string UserName { get; set; }
        [DisplayName("Ngày sinh")]
        public DateTime? BirthDay { get; set; }
        [DisplayName("Email")]
        public string Email { get; set; }
        [DisplayName("Số điện thoại")]
        public string PhoneNumber { get; set; }
        [DisplayName("Địa chỉ")]
        public string Address { get; set; }
        [DisplayName("Facebook")]
        public string Facebook { get; set; }
        [DisplayName("Yahoo")]
        public string Yahoo { get; set; }
        [DisplayName("Skype")]
        public string Skype { get; set; }

    }
}