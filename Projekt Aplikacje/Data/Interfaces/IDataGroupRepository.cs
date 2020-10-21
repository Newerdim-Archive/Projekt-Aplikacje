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
        Task<DataGroup> GetByNameWithUserDataAsync(string name, int userId);
        Task<DataGroup> GetByNameWithUserDataAsync(string name, int howMany, int userId);
        Task<DataGroup> GetByIdWithUserDataAsync(int id, int userId);
        Task<DataGroup> GetByIdWithUserDataAsync(int id, int howMany, int userId);
        Task<ICollection<DataGroup>> GetAllWithoutDataAsync();
    }
}
