using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.MongoDBEntities
{
    public class MessageUser
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
    }
}