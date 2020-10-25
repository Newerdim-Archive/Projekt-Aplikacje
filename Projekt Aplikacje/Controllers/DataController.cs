using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Projekt_Aplikacje.Dtos.Data;
using Projekt_Aplikacje.Models;
using Todo.Data;

namespace Projekt_Aplikacje.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DataController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public DataController(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var datasInDb = await _uow.Data.GetAllFromUser(GetUserId());

            if (!datasInDb?.Any() ?? true)
                return NotFound("Użytkownik nie posiada żadnych danych.");

            return Ok(_mapper.Map<ICollection<DataDto>>(datasInDb));
        }

        [HttpGet("{dataId}")]
        public async Task<IActionResult> Get(int dataId)
        {
            var dataInDb = await _uow.Data.GetByIdFromUser(dataId, GetUserId());

            if (dataInDb == null)
                return NotFound("Nie znaleziono danych o takim id.");

            return Ok(_mapper.Map<DataDto>(dataInDb));
        }

        [HttpPost]
        public async Task<IActionResult> Add(DataForAddDto dataForAddDto)
        {
            var dataForAdd = _mapper.Map<DataModel>(dataForAddDto);
            dataForAdd.UserId = GetUserId();

            // TODO: Autoincrement datas with same date

            await _uow.Data.AddAsync(dataForAdd);
            await _uow.SaveAsync();

            return CreatedAtAction(nameof(Get), new { id = dataForAdd.Id },
                _mapper.Map<DataDto>(dataForAdd));
        }

        [HttpPut("{dataId}")]
        public async Task<IActionResult> Update(int dataId, DataForUpdateDto dataForUpdateDto)
        {
            var dataInDb = await _uow.Data.GetByIdFromUser(dataId, GetUserId());

            if (dataInDb == null)
            {
                return NotFound("Nie znaleziono danych o takim id.");
            }

            _mapper.Map(dataForUpdateDto, dataInDb);

            await _uow.SaveAsync();

            return Ok(_mapper.Map<DataDto>(dataInDb));
        }

        [HttpDelete("{dataId}")]
        public async Task<IActionResult> Delete(int dataId)
        {
            var dataInDb = await _uow.Data.GetByIdFromUser(dataId, GetUserId());

            if (dataInDb == null)
            {
                return NotFound("Nie znaleziono danych o takim id.");
            }

            _uow.Data.Remove(dataInDb);
            await _uow.SaveAsync();

            return NoContent();
        }

        private int GetUserId()
        {
            return int.TryParse(User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier)?.Value,
                out var tempVal) ? tempVal : 0;
        }
    }
}
