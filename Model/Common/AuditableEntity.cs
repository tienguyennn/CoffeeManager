using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public abstract class AuditableEntity<T> : Entity<T>, IAuditableEntity
    {
        [ScaffoldColumn(false)]
        public DateTime CreatedDate { get; set; }


        [MaxLength(256)]
        [ScaffoldColumn(false)]
        public string CreatedBy { get; set; }
    
        public long? CreatedID { get; set; }

        [ScaffoldColumn(false)]
        public DateTime UpdatedDate { get; set; }

        [MaxLength(256)]
        [ScaffoldColumn(false)]
        public string UpdatedBy { get; set; }
        [ScaffoldColumn(false)]

        public long? UpdatedID { get; set; }

        public bool? IsDelete { get; set; }

        public DateTime? DeleteTime { get; set; }

        public long? DeleteId { get; set; }

        //public long? OldSysId { get; set; }


    }
}
