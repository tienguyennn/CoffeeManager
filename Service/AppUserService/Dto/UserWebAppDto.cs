using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.AppUserService.Dto
{
    public class UserWebAppDto
    {
        public long? Id { get; set; }
        [DisplayName("Tên websilte/ứng dụng")]
        public string Name { get; set; }
        [DisplayName("Tên miền")]
        public string Domain { get; set; }
        [DisplayName("Trạng thái")]
        public int Status { get; set; }
        public string StatusName { get; set; }
        public string StatusColor { get; set; }
        [DisplayName("Biểu tượng tín nhiệm")]
        public string BTTN { get; set; }
        public string Type { get; set; }
        [DisplayName("Ngày xác nhận")]
        public DateTime? ApprovedDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? OutDate { get; set; }
        public int ManageType { get; set; }
        public string ManageTypeName { get; set; }
        public long? StickId { get; set; }
        public string StickName { get; set; }
        public string StickIcon { get; set; }
        public string Logo { get; set; }

    }
}
