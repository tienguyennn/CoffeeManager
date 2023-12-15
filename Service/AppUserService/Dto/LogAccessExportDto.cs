using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;

namespace Service.AppUserService.Dto
{
    public class LogAccessExportDto
    {
        [DisplayName("Tên đăng nhập")]
        public string UserName { get; set; }
        [DisplayName("Ngày truy cập")]
        public DateTime? TimeAccessed { get; set; }
    }
}