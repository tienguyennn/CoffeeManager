using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Web.Mvc;

namespace Model.MongoEntities
{
    public class QuickFilterMDB : MongoEntity
    {
        public string Name { get; set; }
        public string QueryCommand { get; set; }
        public string Text { get; set; }
        public string Value { get; set; }
        public List<SelectListItem> ListSelect { get; set; }
    }


}
