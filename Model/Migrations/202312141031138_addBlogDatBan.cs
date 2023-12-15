namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addBlogDatBan : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Blog",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        TieuDe = c.String(),
                        NoiDung = c.String(),
                        HinhAnh = c.String(),
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
                "dbo.DatBan",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Ho = c.String(),
                        Ten = c.String(),
                        ThoiGian = c.DateTime(nullable: false),
                        DienThoai = c.String(),
                        NoiDung = c.String(),
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
            DropTable("dbo.DatBan");
            DropTable("dbo.Blog");
        }
    }
}
