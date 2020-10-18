using Projekt_Aplikacje.Data;
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
        private IAuthRepository _auth;


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
