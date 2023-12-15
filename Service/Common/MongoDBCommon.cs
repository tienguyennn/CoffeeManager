using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Common
{
    public class MongoDBCommon
    {
        static string MongoDatabaseName = ConfigurationManager.AppSettings["MongoDatabaseName"];
        static string MongoUsername = ConfigurationManager.AppSettings["MongoUsername"];
        static string MongoPassword = ConfigurationManager.AppSettings["MongoPassword"];
        static string MongoPort = ConfigurationManager.AppSettings["MongoPort"];
        static string MongoHost = ConfigurationManager.AppSettings["MongoHost"];
        public static MongoClient GetClient()
        {
            var settings = new MongoClientSettings
            {
                Server = new MongoServerAddress(MongoHost, Convert.ToInt32(MongoPort))
            };
            return new MongoClient(settings);

        }
        public static IMongoDatabase GetDatabase()
        {
            var mongoDatabase = GetClient().GetDatabase(MongoDatabaseName);
            return mongoDatabase;
        }

        public static IMongoCollection<T> GetCollection<T>()
        {
            var typeT = typeof(T);
            var _collection = GetDatabase().GetCollection<T>(typeT.Name);
            return _collection;
        }

    }
}
