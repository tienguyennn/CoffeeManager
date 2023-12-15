using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models
{
    public class MenuViewModel
    {
        public long Id { get; set; }
        public string Address { get; set; }
        public string Avatar { get; set; }
        public string UserName { get; set; }
        public int Status { get; set; }
        public string FullName { get; set; }
        public string TypeOrganization { get; set; }
        public long? OrganizationId { get; set; }
        public string ProvinceManagement { get; set; }
        public long? CreatedID { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool? Block { get; set; }
        public int TypeDashboard { get; set; }
    }
}