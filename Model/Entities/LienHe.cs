using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Entities
{
    [Table("LienHe")]
    public class LienHe : AuditableEntity<long>
    {
        public string HoTen { get; set; }
public string Email { get; set; }
public string TieuDe { get; set; }
public string NoiDung { get; set; }

        
    }
}
