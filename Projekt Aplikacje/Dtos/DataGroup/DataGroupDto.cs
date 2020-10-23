using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Todo.Models;

namespace Projekt_Aplikacje.Models
{
    public class DataGroupDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Unit { get; set; }

        public ICollection<DataModel> Datas { get; set; }
    }
}
