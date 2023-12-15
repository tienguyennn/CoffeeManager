using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.OrderDetailService.Dto
{
    public class OrderDetailSearchDto : SearchBase
    {
		public long? OrderIdFilter { get; set; }
		public long? SanPhamIdFilter { get; set; }
		public int? SoLuongFilter { get; set; }
		public decimal? GiaTienFilter { get; set; }


    }
}