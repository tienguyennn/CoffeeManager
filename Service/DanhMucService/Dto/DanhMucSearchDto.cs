using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.DanhMucService.Dto
{
    public class DanhMucSearchDto : SearchBase
    {
		public string TenDanhMucFilter { get; set; }
		public string MaDanhMucFilter { get; set; }
		public int? ThuTuFilter { get; set; }
		public string GhiChuFilter { get; set; }


    }
}