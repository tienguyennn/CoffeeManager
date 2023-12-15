using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonHelper.Validation
{
    public class DateRangeAttribute : RangeAttribute
    {
        public DateRangeAttribute(string mininumDate) : base(typeof(DateTime), mininumDate, string.Format("{0:dd/MM/yyyy}", DateTime.Now))
        {
            ErrorMessage = "Vui lòng nhập ngày nhỏ hơn hiện tại";
        }
    }
    public class CheckDateRangeAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if(value == null)
            {
                return ValidationResult.Success;
            }

            DateTime dt = (DateTime)value;
            if (dt < DateTime.Today)
            {
                return ValidationResult.Success;
            }

            return new ValidationResult(ErrorMessage ?? "Vui lòng nhập ngày nhỏ hơn hiện tại");
        }

    }
}
