using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Projekt_Aplikacje.Models;
using Todo.Data;

namespace Projekt_Aplikacje.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DataGroupController : Controller
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public DataGroupController(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var dataGroupsInDb = await _uow.DataGroup.GetAllWithoutDataAsync();

            if (!dataGroupsInDb?.Any() ?? true)
                return NotFound("Nie znaleziono grup.");

            return Ok(_mapper.Map<ICollection<DataGroupWithoutDataDto>>(dataGroupsInDb));
        }

        [HttpGet("{groupName}/{howMany?}")]
        public async Task<IActionResult> GetByName(string groupName, int? howMany = null)
        {
            DataGroup dataGroupInDb;
            groupName = groupName.ToLower();

            if (howMany.HasValue)
            {
                dataGroupInDb = await _uow.DataGroup.GetByNameWithUserDataAsync(groupName, howMany.Value, GetUserId());
            }
            else
            {
                dataGroupInDb = await _uow.DataGroup.GetByNameWithUserDataAsync(groupName, GetUserId());
            }

            if (dataGroupInDb == null)
                return NotFound("Nie znaleziono grupy o takiej nazwie.");

            return Ok(_mapper.Map<DataGroupDto>(dataGroupInDb));
        }

        [HttpGet("{groupId:int}/{howMany?}")]
        public async Task<IActionResult> GetById(int groupId, int? howMany = null)
        {
            DataGroup dataGroupInDb;

            if (howMany.HasValue)
            {
                dataGroupInDb = await _uow.DataGroup.GetByIdWithUserDataAsync(groupId, howMany.Value, GetUserId());
            }
            else
            {
                dataGroupInDb = await _uow.DataGroup.GetByIdWithUserDataAsync(groupId, GetUserId());
            }

            if (dataGroupInDb == null)
                return NotFound("Nie znaleziono grupy o takim id.");

            return Ok(_mapper.Map<DataGroupDto>(dataGroupInDb));
        }

        private int GetUserId()
        {
            return int.TryParse(User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier)?.Value,
                out var tempVal) ? tempVal : 0;
        }
    }
}
