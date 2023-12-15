using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Model.MongoEntities
{

    public class Entity<TKey>
    {
        public static bool operator ~(Entity<TKey> entity) => entity != null;

        [BsonId]
        public TKey Id { get; set; }

    }
    //public class MongoEntity : Entity<Guid>
    //{
    //    //public DateTime? CreateDate { get; set; }
    //    //public DateTime? UpdateDate { get; set; }
    //}

    public interface ISoftDeleted
    {
        bool IsDeleted { get; set; }
    }
}
