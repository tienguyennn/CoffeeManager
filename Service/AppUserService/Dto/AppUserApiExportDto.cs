using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.AppUserService.Dto
{
    public class AppUserApiExportDto
    {
        [DisplayName("Họ và tên")]
        public string FullName { get; set; }
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
    }
}
