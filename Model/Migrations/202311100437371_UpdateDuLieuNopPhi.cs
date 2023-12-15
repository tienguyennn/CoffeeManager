namespace Hinet.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateDuLieuNopPhi : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.DuLieuNopPhi", "Quy", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.DuLieuNopPhi", "Quy");
        }
    }
}
