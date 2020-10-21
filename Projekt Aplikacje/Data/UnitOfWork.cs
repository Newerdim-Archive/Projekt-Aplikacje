using Projekt_Aplikacje.Data;
using Projekt_Aplikacje.Data.Interfaces;
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
        private IDataGroupRepository _dataGroup;
        private IDataRepository _data;

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

        public IDataGroupRepository DataGroup
        {
            get
            {
                if (_dataGroup == null)
                {
                    _dataGroup = new DataGroupRepository(_context);
                }

                return _dataGroup;
            }
        }

        public IDataRepository Data
        {
            get
            {
                if (_data == null)
                {
                    _data = new DataRepository(_context);
                }

                return _data;
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
