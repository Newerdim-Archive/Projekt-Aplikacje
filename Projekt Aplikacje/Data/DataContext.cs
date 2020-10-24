using Microsoft.EntityFrameworkCore;
using Projekt_Aplikacje.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Todo.Models;

namespace Projekt_Aplikacje.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) 
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DataGroup>().HasData(
                    new DataGroup { Id = 1, Name = "Waga", Unit = "kg", Datas = new List<DataModel>() },
                    new DataGroup { Id = 2, Name = "Kalorie", Unit = "kcal", Datas = new List<DataModel>() },
                    new DataGroup { Id = 3, Name = "Sen", Unit = "h", Datas = new List<DataModel>() },
                    new DataGroup { Id = 4, Name = "Woda", Unit = "ml", Datas = new List<DataModel>() },
                    new DataGroup { Id = 5, Name = "Trening", Unit = "h", Datas = new List<DataModel>() },
                    new DataGroup { Id = 6, Name = "Samopoczucie", Unit = "", Datas = new List<DataModel>() }
                );
        }

        public DbSet<User> Users { get; set; }
        public DbSet<DataGroup> DataGroups { get; set; }
        public DbSet<DataModel> Datas { get; set; }
    }
}
