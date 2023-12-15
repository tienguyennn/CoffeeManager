namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addisPhatHanh : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Blog", "MoTa", c => c.String());
            AddColumn("dbo.Blog", "IsPhatHanh", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Blog", "IsPhatHanh");
            DropColumn("dbo.Blog", "MoTa");
        }
    }
}
