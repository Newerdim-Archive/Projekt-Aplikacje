using Microsoft.EntityFrameworkCore.Migrations;

namespace Projekt_Aplikacje.Migrations
{
    public partial class addDescriptionToDataModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Datas",
                nullable: true);

            migrationBuilder.InsertData(
                table: "DataGroups",
                columns: new[] { "Id", "Name", "Unit" },
                values: new object[] { 6, "Samopoczucie", "" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "DataGroups",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Datas");
        }
    }
}
