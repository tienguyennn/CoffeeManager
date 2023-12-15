using Model.Entities;
using Web.HubControl;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Web.Core
{
    public class NotificationProvider
    {
        public static async Task SendMessage(Notification tb)
        {
            var tbHub = GlobalHost.ConnectionManager.GetHubContext<ThongBaoHub>();
            if (true)
            {
                var userConnnect = RepositoryConnectUser.AllChuyenvien();
                tbHub.Clients.Clients(userConnnect.ToArray()).thongbaoglobal(tb.Message, tb.Link);
            }
            else
            {
                var userConnnect = RepositoryConnectUser.Find(tb.ToUser);
                if (userConnnect != null && userConnnect.LstConnection != null && userConnnect.LstConnection.Any())
                {

                    //if (userConnnect.TypeAccount == AccountTypeConstant.BussinessUser)
                    //{
                    tbHub.Clients.Clients(userConnnect.LstConnection.ToArray()).thongbao(tb.Message, tb.Link, false);
                    //}
                    //else
                    //{
                    //    tbHub.Clients.Clients(userConnnect.LstConnection.ToArray()).thongbao(tb.Message, tb.Link, true);

                    //}
                }
            }
        }

        public static void SessionTimeOut(long userId)
        {
            var tbHub = GlobalHost.ConnectionManager.GetHubContext<ThongBaoHub>();

            var userConnnect = RepositoryConnectUser.Find(userId);
            if (userConnnect != null && userConnnect.LstConnection != null && userConnnect.LstConnection.Any())
            {
                tbHub.Clients.Clients(userConnnect.LstConnection.ToArray()).SessionTimeOut();

            }
        }

    }
}