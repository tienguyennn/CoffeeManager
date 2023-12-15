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
    public class ConfigCrawl : MAuditableEntity<ObjectId>
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string SearhUrl { get; set; }


        public string PostSelector { get; set; }

        public int StartPage { get; set; }

        public string LinkSelector { get; set; }

        public string TitleSelector { get; set; }

        public string SubTitleSelector { get; set; }

        public string ContentSelector { get; set; }

        public string TimeSelector { get; set; }
        public string TimeFormat { get; set; }

        public string ImageSelector { get; set; }
        public List<ConfigCategory> ConfigCategories { get; set; }

    }
}
