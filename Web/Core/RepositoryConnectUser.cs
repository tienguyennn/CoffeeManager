using Service.AppUserService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.Core
{
    public class RepositoryConnectUser
    {
        private static List<UserConncect> UserEntities { get; set; }

        static RepositoryConnectUser()
        {
            UserEntities = new List<UserConncect>();
        }
        public static UserConncect Find(long? id)
        {
            return UserEntities.Where(x => x.UserId == id).FirstOrDefault();
        }
        public static UserConncect Find(string userName)
        {
            return UserEntities.Where(x => x.UserName == userName).FirstOrDefault();
        }
        public static List<string> All()
        {
            var listResult = new List<string>();

            var listUser = UserEntities.Where(x => x.LstConnection != null).Select(x => x.LstConnection).ToList();
            foreach (var item in listUser)
            {
                if (item.Any())
                {
                    listResult.AddRange(item);
                }
            }
            return listResult;
        }
        public static List<string> AllChuyenvien()
        {
            var listResult = new List<string>();

            var listUser = UserEntities.Where(x => x.LstConnection != null && x.IsChuyenVienCuc).Select(x => x.LstConnection).ToList();
            foreach (var item in listUser)
            {
                if (item.Any())
                {
                    listResult.AddRange(item);
                }
            }
            return listResult;
        }
        public static List<string> AllToaDam()
        {
            var listResult = new List<string>();

            var listUser = UserEntities.Where(x => x.LstConnection != null && x.IsToaDam).Select(x => x.LstConnection).ToList();
            foreach (var item in listUser)
            {
                if (item.Any())
                {
                    listResult.AddRange(item);
                }
            }
            return listResult;
        }

        public static List<long?> AllConnect()
        {
            var listUser = UserEntities.Select(x => x.UserId).ToList();
            return listUser;
        }
        public static void Save(long idUser, string userName, string type, string ConnectionId, bool isToaDam)
        {
            var user = Find(idUser);
            if (user == null)
            {
                user = new UserConncect();
                user.UserId = idUser;
                user.UserName = userName;
                user.TypeAccount = type;
                user.IsToaDam = isToaDam;
                var _appUserService = DependencyResolver.Current.GetService<IAppUserService>();
                //user.IsChuyenVienCuc = _appUserService.CheckUserInCucTMDT(idUser);

                user.LstConnection.Add(ConnectionId);
                UserEntities.Add(user);
            }
            else
            {
                var isExist = user.LstConnection.Where(x => x.Equals(ConnectionId)).FirstOrDefault();
                if (isExist == null)
                {
                    user.LstConnection.Add(ConnectionId);
                }
                else
                {
                    user.IsToaDam = isToaDam;

                }
            }
        }
        public static void Remove(string connectId)
        {
            foreach (var item in UserEntities)
            {
                if (item.LstConnection != null && item.LstConnection.Any() && item.LstConnection.Contains(connectId))
                {
                    item.LstConnection.Remove(connectId);
                }
            }
        }
        public static void Remove(long idUser)
        {
            var user = Find(idUser);
            if (user != null)
            {
                UserEntities.Remove(user);
            }
        }
        public static void Remove(long idUser, string ConnectionId)
        {
            var user = Find(idUser);
            if (user != null)
            {
                var item = user.LstConnection.Where(x => x.Equals(ConnectionId)).FirstOrDefault();
                if (item != null)
                {
                    user.LstConnection.Remove(item);
                }
            }
        }
    }
    public class UserConncect
    {
        public long? UserId { get; set; }
        public string UserName { get; set; }
        public string TypeAccount { get; set; }
        public bool IsChuyenVienCuc { get; set; }
        public bool IsToaDam { get; set; }
        public List<string> LstConnection { get; set; }
        public UserConncect()
        {
            LstConnection = new List<string>();
        }
    }
}