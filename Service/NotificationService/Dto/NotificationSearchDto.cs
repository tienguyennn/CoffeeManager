using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.NotificationService.Dto
{
    public class NotificationSearchDto : SearchBase
    {
        public bool IsReadFilter { get; set; }
        public long? FromUserFilter { get; set; }
        public string FromUserNameFilter { get; set; }
        public long? ToUserFilter { get; set; }
        public string MessageFilter { get; set; }
        public string TypeFilter { get; set; }

        public int? IdDonViFilter { get; set; }
        public int? IdDotKeKhaiFilter { get; set; }
    }
}