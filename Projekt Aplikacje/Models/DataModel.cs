using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Todo.Models;

namespace Projekt_Aplikacje.Models
{
    public class DataModel
    {
        public int Id { get; set; }

        public int Value { get; set; }

        public DateTime Date { get; set; }

        public int DataGroupId { get; set; }

        public DataGroup DataGroup { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }
    }
}
