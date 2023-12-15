using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.NotificationRepository
{
    public interface INotificationRepository:IGenericRepository<Notification>
    {
        Notification GetById(long id);

    }
   
}
