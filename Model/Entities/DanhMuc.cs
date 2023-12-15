using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Entities
{
    [Table("DanhMuc")]
    public class DanhMuc : AuditableEntity<long>
    {
        public string TenDanhMuc { get; set; }
        public string MaDanhMuc { get; set; }
        public int ThuTu { get; set; }
        public string GhiChu { get; set; }


    }
}
