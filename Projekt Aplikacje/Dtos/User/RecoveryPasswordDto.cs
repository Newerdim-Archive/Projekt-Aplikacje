using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Todo.Dto.User
{
    public class RecoveryPasswordDto
    {
        [Required]
        public string NewPassword { get; set; }
    }
}
