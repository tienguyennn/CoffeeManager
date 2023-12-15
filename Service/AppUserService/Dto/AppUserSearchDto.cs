using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.AppUserService.Dto
{
    public class AppUserSearchDto : SearchBase
    {
        public string UserNameFilter { get; set; }
        public string FullNameFilter { get; set; }
        public string EmailFilter { get; set; }
        public string AddressFilter { get; set; }
        public string DepartmentIdFilter { get; set; }
        public string IsCongTacVienFilter { get; set; }
        public string IsTruongPhongFilter { get; set; }
        public int? DonViIdFilter { get; set; }
        public string TypeAccountFilter { get; set; }
        public List<int> VaiTroIdFilter { get; set; }
        public bool? IsUserSSO { get; set; }
    }
}
