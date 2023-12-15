using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Web.Areas.UserArea.Models
{
    public class UpdateEnduserVM
    {
        public  long Id { get; set; }
        [Required(ErrorMessage = "Vui lòng nhập mật khẩu")]
        [MinLength(6,ErrorMessage ="Độ dài tối thiểu là 6 ký tự")]
        public string Email { get; set; }
    }
    public class UpdateEnduserPasswordVM
    {
        public long Id { get; set; }
        [Required(ErrorMessage ="Vui lòng nhập mật khẩu")]
        public string Password { get; set; }
        [Required(ErrorMessage = "Vui lòng nhập mật khẩu")]
        [Compare("Password", ErrorMessage ="Vui lòng nhập mật khẩu giống nhau")]
        public string RePassword { get; set; }
    }
    public class CreateEnduserVM
    {
        public long CompanyId { get; set; }
        public string  Email { get; set; }
        [Required(ErrorMessage = "Vui lòng nhập mật khẩu")]
        public string Password { get; set; }
        [Required(ErrorMessage = "Vui lòng nhập mật khẩu")]
        [Compare("Password", ErrorMessage = "Vui lòng nhập mật khẩu giống nhau")]
        public string RePassword { get; set; }
    }
}