using Service.Common;
using Service.NotificationService.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models
{
    public class EndUserNotificationViewModel
    {
        public PageListResultBO<NotificationDto> NotiList { get; set; }
    }
}