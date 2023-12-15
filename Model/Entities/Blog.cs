using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Entities
{
    [Table("Blog")]
    public class Blog : AuditableEntity<long>
    {
        public string TieuDe { get; set; }
        public string MoTa { get; set; }
        public string NoiDung { get; set; }
        public string HinhAnh { get; set; }
        public bool IsPhatHanh { get; set; }


    }
}
