using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Service.Common
{
    public class WebsiteHomeSearchVM
    {
        [Required(ErrorMessage ="Vui lòng nhập thông tin này")]
        [MinLength(2,ErrorMessage ="Vui lòng nhập tối thiểu 2 ký tự")]
        public string DomainNameSearch { get; set; }
        public string CompanySearch { get; set; }
        public string TaxSearch { get; set; }
        public string PhoneSearch { get; set; }
        public string EmailSearch { get; set; }
        public int TypeSearch { get; set; }
    }
}