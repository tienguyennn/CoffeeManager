namespace Hinet.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class alter_qlvanban_keyregex : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.KeyRegex", "Code", c => c.String());
            AddColumn("dbo.QLVanBan", "TaiLieu", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.QLVanBan", "TaiLieu");
            DropColumn("dbo.KeyRegex", "Code");
        }
    }
}
