using Model.Entities;
using Model.IdentityEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.AppUserService.Dto
{
    public class UserDto : AppUser
    {
        public Guid AuditID { get; set; }
        public DateTime TimeAccessed { get; set; }
        public string DepartmentName { get; set; }
        public string IdChucVuName { get; set; }
        public string ListAllProvince { get; set; }
        public string OrganizationName { get; set; }
        public List<string> ProvinceManagementNameEndUser { get; set; }
        public List<string> ProvinceManagementNameDepartment { get; set; }
        public List<string> ProvinceManagementNameDepartmentAndUser { get; set; }
        public string TinhProvince { get; set; }
        public string HuyenProvince { get; set; }
        public string XaProvince { get; set; }
        public string QuocGiaProvince { get; set; }
        public string StickId { get; set; }
        public bool IsSelected { get; set; }
        public bool IsLock { get; set; }


        //độ ưu tiên xử lý tin bài (đi theo chức vụ)
        public int Priority { get; set; }
        public string TenVaiTroMacDinh { get; set; }
        public string MaVaiTroMacDinh { get; set; }
        public long? IdVaiTroMacDinh { get; set; }
        public bool includeDVCCoHanNghach { get; set; }

        public string DonViName { get; set; }

        //thông tin cấu hình hệ thống
        public string SystemConfigProviceName { get; set; }
        public string SystemConfigUnitName { get; set; }
        public string SystemConfigProductionYear { get; set; }


        //thông tin vai trò
        public bool IsChuyenVienTongHop { get; set; }
        public bool IsLanhDaoTongHop { get; set; }

        public bool IsUserSS0 { get; set; }
        public bool IsNguoiDungXa { get; set; }
        public long? CapDanhGia { get; set; }
        public string SsoLogOut { get; set; }
    }
}
