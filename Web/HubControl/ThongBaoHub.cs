using Web.Core;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Web.HubControl
{
    public class ThongBaoHub : Hub
    {
        public void Hello()
        {
            Clients.All.hello();
        }

        public void init(long idUser, string userName, string connectId, string type, bool isToaDam)
        {
            RepositoryConnectUser.Save(idUser, userName, type, connectId, isToaDam);
        }

        public void initByType(long idUser, string connectId, int idToaDam, string type)
        {
            RepositoryConnectUserToaDam.Save(idUser, connectId, idToaDam, type);
        }

        public override System.Threading.Tasks.Task OnConnected()
        {

            //Clients.Others.userConnected(Context.ConnectionId);

            return base.OnConnected();
        }

        public override Task OnDisconnected(bool ak)
        {

            //Clients.Others.userLeft(Context.ConnectionId);
            RepositoryConnectUser.Remove(Context.ConnectionId);
            return base.OnDisconnected(false);
        }
    }
}