namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addLienHeOrder : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.LienHe",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        HoTen = c.String(),
                        Email = c.String(),
                        TieuDe = c.String(),
                        NoiDung = c.String(),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.String(maxLength: 256),
                        CreatedID = c.Long(),
                        UpdatedDate = c.DateTime(nullable: false),
                        UpdatedBy = c.String(maxLength: 256),
                        UpdatedID = c.Long(),
                        IsDelete = c.Boolean(),
                        DeleteTime = c.DateTime(),
                        DeleteId = c.Long(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Order",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Ho = c.String(),
                        Ten = c.String(),
                        DiaChi = c.String(),
                        DiaChiChiTiet = c.String(),
                        DienThoai = c.String(),
                        Email = c.String(),
                        SanPhamIds = c.String(),
                        TrangThai = c.String(),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.String(maxLength: 256),
                        CreatedID = c.Long(),
                        UpdatedDate = c.DateTime(nullable: false),
                        UpdatedBy = c.String(maxLength: 256),
                        UpdatedID = c.Long(),
                        IsDelete = c.Boolean(),
                        DeleteTime = c.DateTime(),
                        DeleteId = c.Long(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Order");
            DropTable("dbo.LienHe");
        }
    }
}
