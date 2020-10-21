using System;
using System.Collections.Generic;
using System.Linq;
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
            return Ok(await _uow.DataGroup.GetAllAsync());
        }

        [HttpGet("{groupName}")]
        public async Task<IActionResult> GetByName(string name)
        {
            return Ok(await _uow.DataGroup.GetByNameAsync(name));
        }

        [HttpGet("{groupId}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _uow.DataGroup.GetAsync(id));
        }
    }
}
