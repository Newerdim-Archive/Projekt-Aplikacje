using Microsoft.EntityFrameworkCore;
using Projekt_Aplikacje.Data;
using Projekt_Aplikacje.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Test_Projekt_Aplikacje
{
    public class DataSeedFixture : IDisposable
    {
        public DataContext DataContext { get; private set; }

        public DataSeedFixture()
        {
            var options = new DbContextOptionsBuilder<DataContext>()
            .UseInMemoryDatabase("DataGroupDatabase")
            .Options;

            DataContext = new DataContext(options);

            #region Seed Data
            var dataGroups = new List<DataGroup>
            {
                new DataGroup { Name = "Waga", Unit = "kg" }, // Id 1
                new DataGroup { Name = "Kalorie", Unit = "kcal" }, // Id 2
                new DataGroup { Name = "Sen", Unit = "h" }, // Id 3
                new DataGroup { Name = "Woda", Unit = "ml" }, // Id 4
                new DataGroup { Name = "Trening", Unit = "h" } // Id 5
            };

            var datas = new List<DataModel>
            {
                new DataModel { DataGroupId = 1, Date = DateTime.Now, UserId = 1, Value = 80 },
                new DataModel { DataGroupId = 5, Date = DateTime.Now, UserId = 1, Value = 1.5 },
                new DataModel { DataGroupId = 3, Date = DateTime.Now, UserId = 1, Value = 8 },
                new DataModel { DataGroupId = 1, Date = DateTime.Now, UserId = 2, Value = 82 },
                new DataModel { DataGroupId = 2, Date = DateTime.Now, UserId = 2, Value = 1500 },
                new DataModel { DataGroupId = 2, Date = DateTime.Now, UserId = 3, Value = 2550 },
                new DataModel { DataGroupId = 4, Date = DateTime.Now, UserId = 3, Value = 3000 },
            };
            #endregion

            DataContext.DataGroups.AddRange(dataGroups);
            DataContext.Datas.AddRange(datas);
            DataContext.SaveChanges();
        }

        public void Dispose()
        {
            DataContext.Dispose();
        }
    }
}
