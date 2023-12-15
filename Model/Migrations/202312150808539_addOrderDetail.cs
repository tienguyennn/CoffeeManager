namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addOrderDetail : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.OrderDetail",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        OrderId = c.Long(nullable: false),
                        SanPhamId = c.Long(nullable: false),
                        SoLuong = c.Int(nullable: false),
                        GiaTien = c.Decimal(nullable: false, precision: 18, scale: 2),
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
            DropTable("dbo.OrderDetail");
        }
    }
}
