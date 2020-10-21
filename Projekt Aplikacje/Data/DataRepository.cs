using Projekt_Aplikacje.Data.Interfaces;
using Projekt_Aplikacje.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Todo.Data.Repository;

namespace Projekt_Aplikacje.Data
{
    public class DataRepository : Repository<DataModel>, IDataRepository
    {
        private readonly DataContext _context;

        public DataRepository (DataContext context)
            : base (context)
        {
            _context = context;
        }
    }
}
