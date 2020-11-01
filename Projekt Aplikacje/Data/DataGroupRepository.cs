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

        public async Task<ICollection<DataGroup>> GetAllWithoutDataAsync()
        {
            return await _context.DataGroups.ToListAsync();
        }

        public async Task<DataGroup> GetByIdWithUserDataAsync(int id, int userId)
        {
            return await _context.DataGroups
                .Include(g => g.Datas)
                .Where(g => g.Id == id)
                .Select(g => new DataGroup
                {
                    Id = g.Id,
                    Name = g.Name,
                    Unit = g.Unit,
                    ChartType = g.ChartType,
                    Datas = g.Datas
                        .Where(d => d.UserId == userId)
                        .ToList()
                })
                .FirstOrDefaultAsync();
        }

        public async Task<DataGroup> GetByIdWithUserDataAsync(int id, int howMany, int userId)
        {
            return await _context.DataGroups
                .Include(g => g.Datas)
                .Where(g => g.Id == id)
                .Select(g => new DataGroup
                {
                    Id = g.Id,
                    Name = g.Name,
                    Unit = g.Unit,
                    ChartType = g.ChartType,
                    Datas = g.Datas
                        .Where(d => d.UserId == userId)
                        .Take(howMany)
                        .ToList()
                })
                .FirstOrDefaultAsync();
        }

        public async Task<DataGroup> GetByNameWithUserDataAsync(string name, int userId)
        {
            return await _context.DataGroups
                .Include(g => g.Datas)
                .Where(g => g.Name == name)
                .Select(g => new DataGroup
                {
                    Id = g.Id,
                    Name = g.Name,
                    Unit = g.Unit,
                    ChartType = g.ChartType,
                    Datas = g.Datas
                        .Where(d => d.UserId == userId)
                        .OrderBy(d => d.Date)
                        .ToList()
                })
                .FirstOrDefaultAsync();
        }

        public async Task<DataGroup> GetByNameWithUserDataAsync(string name, int howMany, int userId)
        {
            return await _context.DataGroups
                .Include(g => g.Datas)
                .Where(g => g.Name == name)
                .Select(g => new DataGroup
                {
                    Id = g.Id,
                    Name = g.Name,
                    Unit = g.Unit,
                    ChartType = g.ChartType,
                    Datas = g.Datas
                        .Where(d => d.UserId == userId)
                        .Take(howMany)
                        .ToList()
                })
                .FirstOrDefaultAsync();
        }
    }
}
