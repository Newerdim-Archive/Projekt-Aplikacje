using Projekt_Aplikacje.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Todo.Data.Interfaces;

namespace Projekt_Aplikacje.Data.Interfaces
{
    public interface IDataGroupRepository : IRepository<DataGroup>
    {
        Task<DataGroup> GetByNameFromUserAsync(string name);
        Task<DataGroup> GetByIdFromUserAsync(int id);
        Task<ICollection<DataGroup>> GetAllFromUserAsync();
    }
}
