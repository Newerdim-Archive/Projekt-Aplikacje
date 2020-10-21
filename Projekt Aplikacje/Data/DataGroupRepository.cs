using Microsoft.EntityFrameworkCore;
using Projekt_Aplikacje.Data.Interfaces;
using Projekt_Aplikacje.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Todo.Data.Repository;

namespace Projekt_Aplikacje.Data
{
    public class DataGroupRepository : Repository<DataGroup>, IDataGroupRepository
    {
        private readonly DataContext _context;

        public DataGroupRepository(DataContext context)
            : base(context)
        {
            _context = context;
        }

        public async Task<ICollection<DataGroup>> GetAllFromUserAsync(int userId)
        {
            return await _context.DataGroups
                .Where(g => g.UserId == userId)
                .ToListAsync();
        }

        public Task<DataGroup> GetByIdFromUserAsync(int id, int userId)
        {
            throw new NotImplementedException();
        }

        public async Task<DataGroup> GetByNameFromUserAsync(string name)
        {
            return await _context.DataGroups
                .Include(g => g.Datas)
                .Where(g => g)
                .FirstOrDefaultAsync(g => g.Name == name);
        }
    }
}
