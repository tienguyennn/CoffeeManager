using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.BlogService.Dto
{
    public class BlogSearchDto : SearchBase
    {
		public string TieuDeFilter { get; set; }


    }
}