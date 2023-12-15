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
    public class DataCrawl : MAuditableEntity<ObjectId>
    {
        public string Title { get; set; }

        public Guid ConfigId { get; set; }
        public Guid TopicId { get; set; }
        public string SubTitle { get; set; }

        public string Content { get; set; }
        public string ContentHtml { get; set; }

        public string Link { get; set; }

        public string Image { get; set; }

        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime Time { get; set; }

        public List<string> Tags { get; set; }
        public List<Guid> Categories { get; set; }


    }
}
