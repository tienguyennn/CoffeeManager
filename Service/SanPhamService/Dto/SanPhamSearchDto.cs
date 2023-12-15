using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.SanPhamService.Dto
{
    public class SanPhamSearchDto : SearchBase
    {
		public long? DanhMucIdFilter { get; set; }
		public string TenFilter { get; set; }
		public decimal? GiaFilter { get; set; }
		public int? ThuTuFilter { get; set; }


    }
}