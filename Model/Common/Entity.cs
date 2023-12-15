using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public abstract class BaseEntity
    {
        public static bool operator ~(BaseEntity entity) => entity != null;
    }

    public abstract class Entity<T> : BaseEntity, IEntity<T>
    {
        public virtual T Id { get; set; }
    }
    public abstract class MongoEntity : BaseEntity
    {
        public Guid Id { get; set; }
    }
}
