using AutoMapper;
using Projekt_Aplikacje.Dtos.Data;
using Projekt_Aplikacje.Models;
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
            CreateMap<UserForLoginDto, User>();

            CreateMap<DataForAddDto, DataModel>();
            CreateMap<DataForUpdateDto, DataModel>();

            // Domain To Dto
            CreateMap<DataModel, DataDto>();
            CreateMap<DataGroup, DataGroupDto>();
            CreateMap<DataGroup, DataGroupWithoutDataDto>();
        }
    }
}
