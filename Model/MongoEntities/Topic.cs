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
    public class Topic : MAuditableEntity<ObjectId>
    {
        public string Name { get; set; }
        public string Description { get; set; }

    }
}
