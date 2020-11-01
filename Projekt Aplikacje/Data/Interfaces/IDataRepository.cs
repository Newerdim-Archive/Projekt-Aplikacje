using Projekt_Aplikacje.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Todo.Data.Interfaces;

namespace Projekt_Aplikacje.Data.Interfaces
{
    public interface IDataRepository : IRepository<DataModel>
    {
        Task<DataModel> GetByIdFromUser(int id, int userId);
        Task<ICollection<DataModel>> GetAllFromUser(int userId);
        Task<DataModel> GetByDateWithGroupFromUser(DateTime date, int dataGroupId, int userId);
    }
}
