using Model.Entities;
using Model.IdentityEntities;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Threading;

namespace Model
{
    public class HinetContext : IdentityDbContext<AppUser, AppRole, long, AppLogin, AppUserRole, AppClaim>
    {
        public HinetContext()
            : base("Name=HinetContext")
        {
            //sử dụng cho việc unit test
            Database.SetInitializer<HinetContext>(null);
        }

        //public DbSet<Audit> Audit { get; set; }
      
        public DbSet<Notification> Notification { get; set; }
        public DbSet<DanhMuc> DanhMuc { get; set; }
        public DbSet<SanPham> SanPham { get; set; }
        public DbSet<Blog> Blog { get; set; }
        public DbSet<DatBan> DatBan { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<OrderDetail> OrderDetail { get; set; }
        public DbSet<LienHe> LienHe { get; set; }
       
        public static HinetContext Create()
        {
            return new HinetContext();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<AppUser>().ToTable("AppUser");
            modelBuilder.Entity<AppUserRole>().ToTable("AppUserRole");
            modelBuilder.Entity<AppRole>().ToTable("AppRole");
            modelBuilder.Entity<AppClaim>().ToTable("AppClaim");
            modelBuilder.Entity<AppLogin>().ToTable("AppLogin");

            modelBuilder.Entity<AppUser>().Property(x => x.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            modelBuilder.Entity<AppRole>().Property(x => x.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            modelBuilder.Entity<AppClaim>().Property(x => x.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }

        public override int SaveChanges()
        {
            var modifiedEntries = ChangeTracker.Entries()
                .Where(x => x.Entity is IAuditableEntity
                    && (x.State == System.Data.Entity.EntityState.Added || x.State == System.Data.Entity.EntityState.Modified));

            foreach (var entry in modifiedEntries)
            {
                IAuditableEntity entity = entry.Entity as IAuditableEntity;
                if (entity != null)
                {
                    string identityName = Thread.CurrentPrincipal.Identity.Name;
                    var userId = this.Users.Where(x => x.UserName == identityName).Select(x => x.Id).FirstOrDefault();

                    DateTime now = DateTime.Now;

                    if (entry.State == System.Data.Entity.EntityState.Added)
                    {
                        entity.CreatedBy = identityName;
                        entity.CreatedDate = now;
                        entity.CreatedID = userId;
                    }
                    else
                    {
                        base.Entry(entity).Property(x => x.CreatedBy).IsModified = false;
                        base.Entry(entity).Property(x => x.CreatedDate).IsModified = false;
                    }

                    entity.UpdatedBy = identityName;
                    entity.UpdatedDate = now;
                    entity.UpdatedID = userId;
                }
            }

            return base.SaveChanges();
        }

        public IEnumerable<string> GetTables()
        {
            var connection = (SqlConnection)Database.Connection;
            if (connection.State != ConnectionState.Open)
                connection.Open();
            var tables = connection.GetSchema("Tables").AsEnumerable().Where(x => x.Field<string>("TABLE_SCHEMA").Equals("dbo") && !x.Field<string>("TABLE_NAME").Equals("__MigrationHistory"));
            if (connection.State == ConnectionState.Open)
                connection.Close();
            return tables.Select(t => t.Field<string>("TABLE_NAME"));
        }
    }
}
