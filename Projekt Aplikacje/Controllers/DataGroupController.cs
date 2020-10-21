using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Projekt_Aplikacje.Data;
using Todo.Data;

namespace Projekt_Aplikacje.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DataGroupController : Controller
    {
        private readonly IUnitOfWork _uow;

        public DataGroupController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _uow.DataGroup.GetAllWithoutDataAsync());
        }

        [HttpGet("{groupName}/{howMany?}")]
        public async Task<IActionResult> GetByName(string name, int? howMany = null)
        {
            if (howMany.HasValue)
                return Ok(await _uow.DataGroup.GetByNameWithUserDataAsync(name, howMany.Value, GetUserId()));

            return Ok(await _uow.DataGroup.GetByNameWithUserDataAsync(name, GetUserId()));
        }

        [HttpGet("{groupId}/{howMany?}")]
        public async Task<IActionResult> GetById(int id, int? howMany = null)
        {
            if (howMany.HasValue)
                return Ok(await _uow.DataGroup.GetByIdWithUserDataAsync(id, howMany.Value, GetUserId()));

            return Ok(await _uow.DataGroup.GetByIdWithUserDataAsync(id, GetUserId()));
        }

        private int GetUserId()
        {
            return int.TryParse(User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier)?.Value,
                out var tempVal) ? tempVal : 0;
        }
    }
}
