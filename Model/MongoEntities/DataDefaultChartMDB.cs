using System;
using System.Collections.Generic;

namespace Model.MongoEntities
{
    public class DataDefaultChartMDB : MongoEntity
    {
        public string Type { get; set; }
        public string DataChart { get; set; }
    }
}
