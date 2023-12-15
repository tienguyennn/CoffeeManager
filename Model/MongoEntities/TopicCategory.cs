using Model.Common;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.MongoEntities
{
    public class TopicCategory : MAuditableEntity<ObjectId>
    {
        public Guid TopicId { get; set; }
        public string Name { get; set; }
        public string Keyword { get; set; }
    }
}
