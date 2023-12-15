using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Entities
{
    [Table("Order")]
    public class Order : AuditableEntity<long>
    {
        public string Ho { get; set; }
public string Ten { get; set; }
public string DiaChi { get; set; }
public string DiaChiChiTiet { get; set; }
public string DienThoai { get; set; }
public string Email { get; set; }
public string SanPhamIds { get; set; }
public string TrangThai { get; set; }

        
    }
}
