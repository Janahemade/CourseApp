using CourseApp.DTOS;
using CourseApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourseApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class InstructorsController : ControllerBase
    {
        private readonly IInstructorService _service;

        public InstructorsController(IInstructorService service)
        {
            _service = service;
        }

        // Any authenticated user can view instructors
        [HttpGet]
        public async Task<ActionResult<List<InstructorResponseDto>>> GetAll()
            => Ok(await _service.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<ActionResult<InstructorResponseDto>> GetById(int id)
        {
            var instructor = await _service.GetByIdAsync(id);
            return instructor == null ? NotFound() : Ok(instructor);
        }

        // Only Admin can manage instructor records
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<InstructorResponseDto>> Create(CreateInstructorDto dto)
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<InstructorResponseDto>> Update(int id, UpdateInstructorDto dto)
        {
            var updated = await _service.UpdateAsync(id, dto);
            return updated == null ? NotFound() : Ok(updated);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            return deleted ? NoContent() : NotFound();
        }
    }
}
