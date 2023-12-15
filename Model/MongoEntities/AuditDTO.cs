using System;

namespace Model.MongoEntities
{
    public class AuditDTO
    {
        public Guid AuditID { get; set; }
        public string IPAddress { get; set; }
        public string UserName { get; set; }
        public string ActionName { get; set; }
        public string URLAccessed { get; set; }
        public DateTime TimeAccessed { get; set; }
        public string Data { get; set; }
    }
}
