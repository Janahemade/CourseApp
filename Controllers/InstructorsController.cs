using CourseApp.DTOS;
using CourseApp.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CourseApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InstructorsController : ControllerBase
    {
        private readonly IInstructorService _service;

        public InstructorsController(IInstructorService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<InstructorResponseDto>>> GetAll()
            => Ok(await _service.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<ActionResult<InstructorResponseDto>> GetById(int id)
        {
            var instructor = await _service.GetByIdAsync(id);
            return instructor == null ? NotFound() : Ok(instructor);
        }

        [HttpPost]
        public async Task<ActionResult<InstructorResponseDto>> Create(CreateInstructorDto dto)
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<InstructorResponseDto>> Update(int id, UpdateInstructorDto dto)
        {
            var updated = await _service.UpdateAsync(id, dto);
            return updated == null ? NotFound() : Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            return deleted ? NoContent() : NotFound();
        }
    }
}
