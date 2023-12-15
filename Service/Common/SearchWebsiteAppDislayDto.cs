using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Common
{
    public class SearchWebsiteAppDislayDto
    {
        public long Id { get; set; }
        public string CompanyName { get; set; }
        //Mã số thuế thương nhân, cá nhân, tổ chức
        public string CompanyTaxCode { get; set; }
        //ĐỊa chỉ thương nhân, cá nhân, tổ chức
        public string CompanyAddress { get; set; }
        //Số điện thoại thương nhân, cá nhân, tổ chức
        public string CompanyPhone { get; set; }
        //Số fax cá nhân, thương nhân , tổ chức
        public string CompanyFax { get; set; }
        //Têm của website
        public string Name { get; set; }
        //Tên miền của website
        public string Domain { get; set; }
        //Loại khách hàng sử dụng website
    }
}
