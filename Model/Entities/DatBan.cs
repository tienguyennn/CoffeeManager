using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Entities
{
    [Table("DatBan")]
    public class DatBan : AuditableEntity<long>
    {
        public string Ho { get; set; }
        public string Ten { get; set; }
        public DateTime ThoiGian { get; set; }
        public string DienThoai { get; set; }
        public string NoiDung { get; set; }
        public string TrangThai { get; set; }


    }
}
