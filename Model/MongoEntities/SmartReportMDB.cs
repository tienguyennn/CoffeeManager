using System;
using System.Collections.Generic;
using System.Dynamic;

namespace Model.MongoEntities
{
    public class SmartReportMDB : MongoEntity, ISoftDeleted
    {
        public string Name { get; set; }
        public string MoTa { get; set; }
        public string Type { get; set; }
        public string DataChart { get; set; }
        public string Connection { get; set; }
        public string QueryCommand { get; set; }
        public List<CommandValue> ListCommandValue { get; set; }
        public string AnhDaiDien { get; set; }
        public bool IsShow { get; set; }
        public bool IsShare{ get; set; }
        public string ClassCol { get; set; }
        public int ThuTu { get; set; }
        public string Height { get; set; }
        public bool IsDeleted { get; set; }
        public string Tab { get; set; }
        public bool isStatic { get; set; }
        public string Url { get; set; }
        public string Roles { get; set; }
        public long? IdDanhMuc { get; set; }
    }

    public class CommandValue
    {
        public Guid? IdQuickFilter { get; set; }
        public string Name { get; set; }
        public int? FilterType { get; set; }
        public string Column { get; set; }
        public string Operation { get; set; }
        public string Value { get; set; }
        public bool IsFilter { get; set; }
        public bool HasOpen { get; set; }
        public bool HasClose { get; set; }

    }
}
