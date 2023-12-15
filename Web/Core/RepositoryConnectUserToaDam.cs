using Service.AppUserService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.Core
{
    public class RepositoryConnectUserToaDam
    {
        private static List<UserConncectToaDam> UserEntities { get; set; }

        static RepositoryConnectUserToaDam()
        {
            UserEntities = new List<UserConncectToaDam>();
        }
        public static UserConncectToaDam Find(long? id, string connection)
        {
            return UserEntities.Where(x => x.UserId == id && x.Connection == connection).FirstOrDefault();
        }
        public static List<string> All()
        {
            var listResult = new List<string>();

            var listUser = UserEntities.Where(x => x.Connection != null).Select(x => x.Connection).ToList();

            return listUser;
        }
        public static List<string> AllByType(string typeItem)
        {
            var listResult = new List<string>();

            var listUser = UserEntities.Where(x => x.Connection != null && x.TypeItem == typeItem).Select(x => x.Connection).ToList();

            return listUser;
        }

        public static List<string> AllByIdType(int idItem, string typeItem)
        {
            var listResult = new List<string>();

            var listUser = UserEntities.Where(x => x.ItemId == idItem && x.TypeItem == typeItem).Select(x => x.Connection).ToList();

            return listUser;
        }
        public static List<string> AllByIdType(int idItem, string typeItem, List<long> users)
        {
            var listResult = new List<string>();

            var listUser = UserEntities.Where(x => x.ItemId == idItem && x.TypeItem == typeItem);
            
            if (users!=null)
            {
                listUser = listUser.Where(x => users.Contains(x.UserId.Value)).ToList();
            }

            return listUser.Select(x => x.Connection).ToList(); ;
        }
        public static void Save(long idUser, string ConnectionId, int idToaDam, string typeItem)
        {
            var user = Find(idUser, ConnectionId);
            if (user == null)
            {
                user = new UserConncectToaDam();
                user.UserId = idUser;
                user.ItemId = idToaDam;
                user.TypeItem = typeItem;
                user.Connection = ConnectionId;
                UserEntities.Add(user);
            }
        }
        public static void Remove(string connectId)
        {
            foreach (var item in UserEntities)
            {

            }
        }
        public static void Remove(long idUser, string connectId)
        {
            var user = Find(idUser, connectId);
            if (user != null)
            {
                UserEntities.Remove(user);
            }
        }

        public static void Remove(long idUser)
        {
            var user = UserEntities.Where(x=>x.UserId==idUser).FirstOrDefault();
            if (user != null)
            {
                UserEntities.Remove(user);
            }
        }

    }
    public class UserConncectToaDam
    {
        public long? UserId { get; set; }
        public int ItemId { get; set; }
        public string TypeItem { get; set; }
        public string Connection { get; set; }

    }
}