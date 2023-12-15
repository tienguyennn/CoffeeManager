using Model.Entities;
using Web.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.HangFireCommon
{
    public class SayHelloAll
    {
        public void hello(string mes)
        {
            var notifycation = new Notification()
            {
                FromUser = 1,
                Message = mes,
            };

            NotificationProvider.SendMessage(notifycation);
        }
    }
}