using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.AppUserService.Dto
{
    public class NguoiDungPhongBanBO
    {
        public List<UserDto> LstNguoiDung { get; set; }
    }
    public class UserListConfig
    {
        public List<NguoiDungPhongBanBO> DanhSachNguoiNhan { get; set; }
    }
}
