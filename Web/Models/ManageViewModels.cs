using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.UI.WebControls;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;

namespace Web.Models
{
    public class IndexViewModel
    {
        public bool HasPassword { get; set; }
        public IList<UserLoginInfo> Logins { get; set; }
        public string PhoneNumber { get; set; }
        public bool TwoFactor { get; set; }
        public bool BrowserRemembered { get; set; }
    }

    public class ManageLoginsViewModel
    {
        public IList<UserLoginInfo> CurrentLogins { get; set; }
        public IList<AuthenticationDescription> OtherLogins { get; set; }
    }

    public class FactorViewModel
    {
        public string Purpose { get; set; }
    }

    public class SetPasswordViewModel
    {
        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "New password")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm new password")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }

    public class ChangePasswordViewModel
    {
        [Required(ErrorMessage = "Vui lòng nhập thông tin này")]
        [DataType(DataType.Password)]
        [Display(Name = "Current password")]
        public string OldPassword { get; set; }
        [Required(ErrorMessage = "Vui lòng nhập thông tin này")]
        [StringLength(100, ErrorMessage = "Mật khẩu mới phải có ít nhât {2} kí tự", MinimumLength = 8)]
        [PasswordStrength(ErrorMessage = "Mật khẩu phải bao gồm chữ cái viết thường, chữ cái viết hoa và chữ số!")]
        [DataType(DataType.Password)]
        [Display(Name = "New password")]
        public string NewPassword { get; set; }
        [Required(ErrorMessage = "Vui lòng nhập thông tin này")]
        [Display(Name = "Confirm new password")]
        [Compare("NewPassword", ErrorMessage = "Mật khẩu mới phải giống nhau")]
        public string ConfirmPassword { get; set; }
    }

    public class PasswordStrengthAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            string password = value as string;

            // Kiểm tra độ dài mật khẩu
            if (string.IsNullOrEmpty(password) || password.Length < 8)
            {
                return false;
            }

            // Kiểm tra chữ cái viết thường, chữ cái viết hoa và chữ số
            bool hasLowercase = false;
            bool hasUppercase = false;
            bool hasDigit = false;
            bool hasSpecialChar = false;

            foreach (char c in password)
            {
                if (char.IsLower(c))
                    hasLowercase = true;
                else if (char.IsUpper(c))
                    hasUppercase = true;
                else if (char.IsDigit(c))
                    hasDigit = true;
                else if (char.IsSymbol(c) || char.IsPunctuation(c))
                    hasSpecialChar = true;
            }

            // Kiểm tra tất cả các quy tắc
            return hasLowercase && hasUppercase && hasDigit;
        }
    }


    public class AddPhoneNumberViewModel
    {
        [Required]
        [Phone]
        [Display(Name = "Phone Number")]
        public string Number { get; set; }
    }

    public class VerifyPhoneNumberViewModel
    {
        [Required]
        [Display(Name = "Code")]
        public string Code { get; set; }

        [Required]
        [Phone]
        [Display(Name = "Phone Number")]
        public string PhoneNumber { get; set; }
    }

    public class ConfigureTwoFactorViewModel
    {
        public string SelectedProvider { get; set; }
        public ICollection<System.Web.Mvc.SelectListItem> Providers { get; set; }
    }


}