using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasySale.Server.Migrations
{
    /// <inheritdoc />
    public partial class RemoveTokenfromUserTabele : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "JwtToken",
                table: "Users");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "JwtToken",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
