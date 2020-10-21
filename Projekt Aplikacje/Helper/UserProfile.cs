using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Todo.Dto;
using Todo.Models;

namespace Projekt_Aplikacje.Helper
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            // Dto To Domain
            CreateMap<UserForRegistrationDto, User>();

            // Domain To Dto

        }
    }
}
