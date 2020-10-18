using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Todo.Data.Interfaces;
using Todo.Helper;

namespace Todo.Data
{
    public interface IUnitOfWork
    {
        ITaskRepository Task { get; }
        IAuthRepository Auth { get; }
        IGroupRepository Group { get; }

        void Save();
        Task SaveAsync();
        
        void Dispose();
        Task DisposeAsync();
    }
}
