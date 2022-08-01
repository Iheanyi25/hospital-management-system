using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HMS.Migrations
{
    public partial class Added_PatientProfile_To_Transactions_Obi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PatientId",
                table: "Transactions",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_PatientId",
                table: "Transactions",
                column: "PatientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_PatientProfiles_PatientId",
                table: "Transactions",
                column: "PatientId",
                principalTable: "PatientProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_PatientProfiles_PatientId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_PatientId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "PatientId",
                table: "Transactions");
        }
    }
}
