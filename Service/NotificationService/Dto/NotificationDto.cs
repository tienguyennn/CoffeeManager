using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.NotificationService.Dto
{
    public class NotificationDto : Notification
    {
        public AppUser FromUserInfo { get; set; }
        public string FromUserName { get; internal set; }

        public int? IdDonVi { get; set; }
        public string TenDonVi { get; set; }

        public int? IdDotKeKhai { get; set; }
        public string TenDotKeKhai { get; set; }
    }
}