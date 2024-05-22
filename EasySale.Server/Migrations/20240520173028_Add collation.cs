﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasySale.Server.Migrations
{
    /// <inheritdoc />
    public partial class Addcollation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase(
                collation: "SQL_Latin1_General_CP1_CS_AS");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase(
                oldCollation: "SQL_Latin1_General_CP1_CS_AS");
        }
    }
}
