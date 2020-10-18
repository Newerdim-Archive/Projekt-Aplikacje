using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Todo.Models;

namespace Todo.Helper
{
    public interface IAuthRepository
    {
        Task<User> LoginAsync(string username, string password);
        Task<User> RegisterAsync(User user, string password);
        Task<bool> UserExistAsync(string username);
        Task<bool> UserExistAsync(int id);
        Task<User> GetUserByIdAsync(int id);
        Task<User> GetUserByEmailAsync(string email);
        User ChangePassword(User user, string newPassword);
        bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt);
    }
}
