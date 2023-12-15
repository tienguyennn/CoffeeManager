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
    public class ConfigCategory : MongoEntity
    {
        public long CategoryId { get; set; }

        public string TextClassify { get; set; }
    }
}
