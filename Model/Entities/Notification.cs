using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Entities
{
    [Table("Notification")]
    public class Notification : AuditableEntity<long>
    {
        [Required]
        public string Message { get; set; }
        public string Link { get; set; }
        public long? FromUser { get; set; }
        public long? ToUser { get; set; }
        public bool IsRead { get; set; }
        [MaxLength(250)]
        public string Type { get; set; }
        public bool? SendToFrontEndUser { get; set; }
        public int? ItemId { get; set; }
        public string ItemName { get; set; }
        public int? ItemType { get; set; }
        public bool? IsDisplay { get; set; }
        public int? DonViId { get; set; }


        public Notification()
        {

        }

        public Notification(string contentThongBao, long idNguoiGui)
        {
            this.Message = contentThongBao;
            this.FromUser = idNguoiGui;
        }

        public Notification(string contentThongBao, long idNguoiGui, long idNguoiNhan)
        {
            this.Message = contentThongBao;
            this.FromUser = idNguoiGui;
            this.ToUser = idNguoiNhan;
        }
    }
}
