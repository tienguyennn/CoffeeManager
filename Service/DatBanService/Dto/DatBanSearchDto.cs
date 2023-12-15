using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.DatBanService.Dto
{
    public class DatBanSearchDto : SearchBase
    {
		public string HoFilter { get; set; }
		public string TenFilter { get; set; }
		public DateTime? ThoiGianFromFilter { get; set; }
		public DateTime? ThoiGianToFilter { get; set; }
		public string DienThoaiFilter { get; set; }
		public string TrangThaiFilter { get; set; }


    }
}