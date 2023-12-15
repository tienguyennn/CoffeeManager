using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Common
{
    public interface IMAuditableEntity
    {
        DateTime CreatedDate { get; set; }

        string CreatedBy { get; set; }
        long CreatedID { get; set; }

        DateTime UpdatedDate { get; set; }
        long UpdatedID { get; set; }
        string UpdatedBy { get; set; }

        bool? IsDelete { get; set; }
        DateTime? DeleteTime { get; set; }
        long DeleteId { get; set; }
    }
}
