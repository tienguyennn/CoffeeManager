using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.OrderService.Dto
{
    public class OrderSearchDto : SearchBase
    {
		public string HoFilter { get; set; }
		public string TenFilter { get; set; }
		public string DiaChiFilter { get; set; }
		public string DiaChiChiTietFilter { get; set; }
		public string DienThoaiFilter { get; set; }
		public string EmailFilter { get; set; }
		public string SanPhamIdsFilter { get; set; }
		public string TrangThaiFilter { get; set; }


    }
}