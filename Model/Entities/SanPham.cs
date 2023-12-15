using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Entities
{
    [Table("SanPham")]
    public class SanPham : AuditableEntity<long>
    {
        public long? DanhMucId { get; set; }
        public string Ten { get; set; }
        public string HinhAnh { get; set; }
        public string MoTa { get; set; }
        public decimal Gia { get; set; }
        public int ThuTu { get; set; }


    }
}
