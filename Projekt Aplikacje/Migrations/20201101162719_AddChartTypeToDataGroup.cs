using Microsoft.EntityFrameworkCore.Migrations;

namespace Projekt_Aplikacje.Migrations
{
    public partial class AddChartTypeToDataGroup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ChartType",
                table: "DataGroups",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "DataGroups",
                keyColumn: "Id",
                keyValue: 1,
                column: "ChartType",
                value: "line");

            migrationBuilder.UpdateData(
                table: "DataGroups",
                keyColumn: "Id",
                keyValue: 2,
                column: "ChartType",
                value: "bar");

            migrationBuilder.UpdateData(
                table: "DataGroups",
                keyColumn: "Id",
                keyValue: 3,
                column: "ChartType",
                value: "bar");

            migrationBuilder.UpdateData(
                table: "DataGroups",
                keyColumn: "Id",
                keyValue: 4,
                column: "ChartType",
                value: "bar");

            migrationBuilder.UpdateData(
                table: "DataGroups",
                keyColumn: "Id",
                keyValue: 5,
                column: "ChartType",
                value: "bar");

            migrationBuilder.UpdateData(
                table: "DataGroups",
                keyColumn: "Id",
                keyValue: 6,
                column: "ChartType",
                value: "bar");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChartType",
                table: "DataGroups");
        }
    }
}
