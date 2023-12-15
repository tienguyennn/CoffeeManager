using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Entities
{
    [Table("OrderDetail")]
    public class OrderDetail : AuditableEntity<long>
    {
        public long OrderId { get; set; }
public long SanPhamId { get; set; }
public int SoLuong { get; set; }
public decimal GiaTien { get; set; }

        
    }
}
