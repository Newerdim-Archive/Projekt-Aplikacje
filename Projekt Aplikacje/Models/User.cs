using Projekt_Aplikacje.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Todo.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public Gender Gender { get; set; }

        public DateTime CreateDate { get; set; }

        public byte[] PasswordSalt { get; set; }

        public byte[] PasswordHash { get; set; }

        public ICollection<DataGroup> DataGroups { get; set; }

        public ICollection<DataModel> Datas { get; set; }
    }
}
