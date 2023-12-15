using CommonHelper.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.Areas.UserArea.Models
{
    public class EditVM
    {
        public long Id { get; set; }
        [Required(ErrorMessage = "Vui lòng nhập thông tin này")]
        [MinLength(3,ErrorMessage="Tối thiểu 3 ký tự")]
        [MaxLength(50, ErrorMessage = "Tối đa 50 ký tự")]
        public string FullName { get; set; }
        [Required(ErrorMessage = "Vui lòng nhập thông tin này")]
        [MinLength(3, ErrorMessage = "Tối thiểu 3 ký tự")]
        [EmailAddress(ErrorMessage = "Sai định dạng email")]
        public string Email { get; set; }
        [Phone(ErrorMessage = "Sai định dạng số điện thoại")]
        public string PhoneNumber { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        [CheckDateRange]
        public DateTime? BirthDay { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập thông tin này")]
        [MinLength(3, ErrorMessage = "Tối thiểu 3 ký tự")]
        [MaxLength(50, ErrorMessage = "Tối đa 50 ký tự")]
        public string UserName { get; set; }

        public int? Gender { get; set; }
        public string Address { get; set; }
        public int TypeDashboard { get; set; }

        public int? VaiTroMacDinh { get; set; }
        public int? DonViId { get; set; }
        public List<int> IdsVaiTro { get; set; }
        public List<SelectListItem> ListVaiTro { get; set; }

        public string Avatar { get; set; }

        public string TypeOrganization { get; set; }
    }
}