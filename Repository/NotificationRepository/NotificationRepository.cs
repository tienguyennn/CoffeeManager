using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.NotificationRepository
{
    public class NotificationRepository : GenericRepository<Notification>, INotificationRepository
    {
        public NotificationRepository(DbContext context)
            : base(context)
        {

        }
        public Notification GetById(long id)
        {
            return FindBy(x => x.Id == id).FirstOrDefault();
        }
        
    }
}
