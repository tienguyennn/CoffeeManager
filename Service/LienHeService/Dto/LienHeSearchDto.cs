using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.LienHeService.Dto
{
    public class LienHeSearchDto : SearchBase
    {
		public string HoTenFilter { get; set; }
		public string EmailFilter { get; set; }


    }
}