using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Todo.Data.Interfaces;
using Todo.Helper;

namespace Todo.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private DataContext _context;
        private ITaskRepository _task;
        private IGroupRepository _group;
        private IAuthRepository _auth;

        public ITaskRepository Task { 
            get
            {
                if (_task == null)
                {
                    _task = new TaskRepository(_context);
                }

                return _task;
            } 
        }

        public IGroupRepository Group
        {
            get
            {
                if (_group == null)
                {
                    _group = new GroupRepository(_context);
                }

                return _group;
            }
        }

        public IAuthRepository Auth
        {
            get
            {
                if (_auth == null)
                {
                    _auth = new AuthRepository(_context);
                }

                return _auth;
            }
        }

        public UnitOfWork(DataContext context)
        {
            _context = context;
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void Save()
        {
            _context.SaveChanges();
        }
        
        public void Dispose()
        {
            _context.Dispose();
        }

        public async Task DisposeAsync()
        {
            await _context.DisposeAsync();
        }
    }
}
