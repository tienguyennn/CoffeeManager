using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.AppUserService.Dto
{
    public class UserDichVuCongSearchDto: SearchBase
    {
        public long IdDichVuCong { get; set; }
        public string FullName { get; set; }
    }
}
