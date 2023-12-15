using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Mvc;
using CompareAttribute = System.ComponentModel.DataAnnotations.CompareAttribute;

namespace Web.Models
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required(ErrorMessage ="Vui lòng nhập email")]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class ExternalLoginListViewModel
    {
        public string ReturnUrl { get; set; }
    }

    public class SendCodeViewModel
    {
        public string SelectedProvider { get; set; }
        public ICollection<System.Web.Mvc.SelectListItem> Providers { get; set; }
        public string ReturnUrl { get; set; }
        public bool RememberMe { get; set; }
    }
    public class LoginViewModelFE
    {
        [Required(ErrorMessage ="Vui lòng nhập thông tin tài khoản")]
        [Display(Name = "Tài khoản")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập thông tin mật khẩu")]
        [DataType(DataType.Password)]
        [Display(Name = "Mật khẩu")]
        public string Password { get; set; }

        [Display(Name = "Ghi nhớ đăng nhập?")]
        public bool RememberMe { get; set; }
    }
    public class VerifyCodeViewModel
    {
        [Required]
        public string Provider { get; set; }

        [Required]
        [Display(Name = "Code")]
        public string Code { get; set; }
        public string ReturnUrl { get; set; }

        [Display(Name = "Remember this browser?")]
        public bool RememberBrowser { get; set; }

        public bool RememberMe { get; set; }
    }

    public class ForgotViewModel
    {
        [Display(Name = "Email")]
        [Required(ErrorMessage ="Email không được để trống")]
        [CustomEmailValidation(ErrorMessage = "Email phải chứa số, chữ cái viết hoa, viết thường và ký tự đặc biệt!")]
        public string Email { get; set; }
    }
    public class CustomEmailValidationAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            string email = value as string;
            if (string.IsNullOrEmpty(email))
                return true;

            // Kiểm tra logic cho độ phức tạp của email
            bool hasSpecialCharacter = email.ContainsSpecialCharacter();
            bool hasUpperCaseLetter = email.ContainsUpperCaseLetter();
            bool hasDigit = email.ContainsDigit();

            // Kiểm tra định dạng email bằng biểu thức chính quy (regular expression)
            string emailPattern = @"^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$";
            bool isEmailFormatValid = Regex.IsMatch(email, emailPattern);

            return hasSpecialCharacter && hasUpperCaseLetter && hasDigit && isEmailFormatValid;
        }
    }

    public static class StringExtensions
    {
        public static bool ContainsSpecialCharacter(this string input)
        {
            return !string.IsNullOrEmpty(input) && Regex.IsMatch(input, @"[^a-zA-Z0-9]");
        }

        public static bool ContainsUpperCaseLetter(this string input)
        {
            return !string.IsNullOrEmpty(input) && Regex.IsMatch(input, @"[A-Z]");
        }

        public static bool ContainsDigit(this string input)
        {
            return !string.IsNullOrEmpty(input) && Regex.IsMatch(input, @"[0-9]");
        }
    }
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Vui lòng nhập thông tin này")]
        [Display(Name = "Tên đăng nhập")]
        [MinLength(3, ErrorMessage = "Độ dài tối thiểu là 3 ký tự")]
        [MaxLength(50, ErrorMessage = "Độ dài tối đa là 50 ký tự")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập thông tin này")]
        [DataType(DataType.Password)]
        [Display(Name = "Mật khẩu")]
        public string Password { get; set; }

        [Display(Name = "Ghi nhớ đăng nhập ?")]
        public bool RememberMe { get; set; }
    }

    public class RegisterViewModel
    {
        //[Required]
        //[EmailAddress]
        //[Display(Name = "Email")]
        //public string Email { get; set; }

        [Required(ErrorMessage="Vui lòng nhập thông tin này")]
        [Display(Name = "Tên đăng nhập")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập thông tin này")]
        [StringLength(100, ErrorMessage = "{0} chứa ít nhật {2} ký tự.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Mật khẩu")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Xác nhận mật khẩu")]
        [Compare("Password", ErrorMessage = "Mật khẩu không giống nhau.")]
        public string ConfirmPassword { get; set; }
    }

    public class ResetPasswordViewModel
    {
        [Required(ErrorMessage = "Vui lòng nhập thông tin này")]
        [Display(Name = "Tài khoản")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập thông tin này")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "Mật khẩu cần giống nhau")]
        public string ConfirmPassword { get; set; }

        public string Code { get; set; }
    }

    public class ChangeUserPasswordViewModel
    {

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "OldPassword")]
        public string OldUserPassword { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "NewPassword")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm new password")]
        [Compare("NewPassword", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmNewPassword { get; set; }
    }

    public class ForgotPasswordViewModel
    {
        [Required(ErrorMessage ="Vui lòng nhập thông tin này")]
        [Display(Name = "Tài khoản")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Vui lòng nhập thông tin này")]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

    }
}
