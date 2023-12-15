using CommonHelper.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.Areas.UserArea.Models
{
    public class EditThongTinCaNhanViewModel
    {
        public long Id { get; set; }
        [RequiredExtend]
        [DisplayName("Họ tên")]
        [MinLength(3, ErrorMessage = "Tối thiểu 3 ký tự")]
        [MaxLength(50, ErrorMessage = "Tối đa 50 ký tự")]
        public string FullName { get; set; }

        [RequiredExtend]
        [DisplayName("Giới tính")]
        public int? Gender { get; set; }
        public List<SelectListItem> ListGender { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        [CheckDateRange]
        [DisplayName("Ngày sinh")]
        public DateTime? BirthDay { get; set; }

        [RequiredExtend]
        [DisplayName("Địa chỉ email")]
        [MinLength(3, ErrorMessage = "Tối thiểu 3 ký tự")]
        [EmailAddress(ErrorMessage = "Sai định dạng email")]
        public string Email { get; set; }

        [DisplayName("Số điện thoại")]
        [Phone(ErrorMessage = "Sai định dạng số điện thoại")]
        public string PhoneNumber { get; set; }

        [DisplayName("Địa chỉ")]
        [StringLengthExtends(maximumLength: 250)]
        public string Address { get; set; }
    }
}