using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Model.IdentityEntities
{
    public class AppUser : IdentityUser<long, AppLogin, AppUserRole, AppClaim>
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<AppUser,long> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }
        public override long Id { get; set; }
        public override string UserName { get; set; }
        public override string Email { get; set; }
        public override string PhoneNumber { get; set; }
        public DateTime? BirthDay { get; set; }
        public int Gender { get; set; }
        public string Address { get; set; }
        [StringLength(250)]
        public string FullName { get; set; }
        public string Avatar { get; set; }
        //public long? IdDepartment { get; set; }
        /// <summary>
        /// Loại tài khoản
        /// </summary>
        public string TypeAccount { get; set; }
        /// <summary>
        /// Loại là cá nhân hay thương nhân
        /// </summary>
        public string TypeOrganization { get; set; }
        public long? OrganizationId { get; set; }
        public int? ChucVuId { get; set; }
        //public string IdChucVu { get; set; }
        public string ProvinceManagement { get; set; }
        public string DichVuCongManagement { get; set; }
        public DateTime? CreatedDate { get; set; }

        /// <summary>
        /// Chức vụ nhận email
        /// </summary>
        public int? IdChucVuNhanMail { get; set; }

        [MaxLength(256)]
        public string CreatedBy { get; set; }

        public long? CreatedID { get; set; }

        public DateTime? UpdatedDate { get; set; }

        public string UpdatedBy { get; set; }

        public long? UpdatedID { get; set; }

        public bool? IsDelete { get; set; }

        public DateTime? DeleteTime { get; set; }

        public long? DeleteId { get; set; }

        //public long? OldSysId { get; set; }
        public string Mobile { get; set; }
        //public string Yahoo { get; set; }
        //public string Skype { get; set; }
        //public string Facebook { get; set; }
        public string Detail { get; set; }
        public DateTime? LastLogin { get; set; }
        public bool? Block { get; set; }

        //cập nhật thời gian khóa tự động
        public DateTime? DateBlockStart { get; set; }
        public DateTime? DateBlockEnd { get; set; }

        /// <summary>
        /// Loại Dashboard
        /// </summary>
        public int TypeDashboard { get; set; }

        public bool IsUpdateNewPass { get; set; }

        //public bool IsAllProvine { get; set; }
        //public bool IsAllLinhVuc { get; set; }
        //public bool IsCongTacVien { get; set; }
        //public bool IsTruongPhongDepartment { get; set; }
        public bool IsSendMail { get; set; }
        public bool ErrorMessage { get; set; }
        public int? DonViId { get; set; }
        public bool IsSingleSignOn { get; set; }
    }
    public class AppUserRole : IdentityUserRole<long>
    {

    }

    public class AppRole : IdentityRole<long, AppUserRole>
    {

    }

    public class AppClaim : IdentityUserClaim<long>
    {

    }
    public class AppLogin : IdentityUserLogin<long>
    {

    }
}
