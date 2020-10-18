using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projekt_Aplikacje.Helper
{
    public class AppSettings
    {
        public string AccessTokenSecret { get; set; }
        public string RefreshTokenSecret { get; set; }
        public string ForgotPasswordTokenSecret { get; set; }
    }
}
