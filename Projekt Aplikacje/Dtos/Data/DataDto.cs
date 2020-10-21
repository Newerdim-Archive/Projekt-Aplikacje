using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projekt_Aplikacje.Dtos.Data
{
    public class DataDto
    {
        public int Id { get; set; }

        public double Value { get; set; }

        public DateTime Date { get; set; }

        public int DataGroupId { get; set; }
    }
}
