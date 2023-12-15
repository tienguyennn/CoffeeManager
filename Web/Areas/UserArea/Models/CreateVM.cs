using CommonHelper.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Web.Areas.UserArea.Models
{
    public class CreateVM
    {
        [Required(ErrorMessage = "Vui lòng nhập thông tin này")]
        [MinLength(3, ErrorMessage = "Tối thiểu 3 ký tự")]
        [MaxLength(50, ErrorMessage = "Tối đa 50 ký tự")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập thông tin này")]
        [MinLength(3, ErrorMessage = "Tối thiểu 3 ký tự")]
        [MaxLength(50, ErrorMessage = "Tối đa 50 ký tự")]
        public string FullName { get; set; }
        [Required(ErrorMessage = "Vui lòng nhập thông tin này")]
        [MinLength(3, ErrorMessage = "Tối thiểu 3 ký tự")]
        [EmailAddress(ErrorMessage = "Sai định dạng email")]
        public string Email { get; set; }
        [Phone(ErrorMessage ="Sai định dạng số điện thoại")]
        public string PhoneNumber { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        [CheckDateRange]
        public DateTime? BirthDay { get; set; }
        public int Gender { get; set; }
        public string Address { get; set; }
        public int? VaiTroMacDinh { get; set; }
        public string IdChucVu { get; set; }
        public List<string> Province { get; set; }
        public int TypeDashboard { get; set; }
        public string Facebook { get; set; }
        public string Skype { get; set; }
        public string Yahoo { get; set; }
        public bool IsCongTacVien { get; set; }
        public bool IsTruongPhongDepartment { get; set; }
        public int? DonviId { get; set; }
        public string TypeOrganization { get; set; }
        
    }
}