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
    public class DataRepository : Repository<DataModel>, IDataRepository
    {
        private readonly DataContext _context;

        public DataRepository (DataContext context)
            : base (context)
        {
            _context = context;
        }

        public async Task<ICollection<DataModel>> GetAllFromUser(int userId)
        {
            return await _context.Datas
                .Where(d => d.UserId == userId)
                .ToListAsync();
        }

        public async Task<DataModel> GetByDateWithGroupFromUser(DateTime date, int dataGroupId, int userId)
        {
            return await _context.Datas
                .Where(d => d.UserId == userId)
                .Where(d => d.DataGroupId == dataGroupId)
                .FirstOrDefaultAsync(d => d.Date == date);
        }

        public async Task<DataModel> GetByIdFromUser(int id, int userId)
        {
            return await _context.Datas
                .Where(d => d.UserId == userId)
                .FirstOrDefaultAsync(d => d.Id == id);
        }
    }
}
