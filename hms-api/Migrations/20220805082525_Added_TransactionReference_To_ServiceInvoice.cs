using Microsoft.EntityFrameworkCore.Migrations;

namespace HMS.Migrations
{
    public partial class Added_TransactionReference_To_ServiceInvoice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TransactionReference",
                table: "ServiceInvoices",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TransactionReference",
                table: "ServiceInvoices");
        }
    }
}
