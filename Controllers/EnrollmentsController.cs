using CourseApp.DTOS;
using CourseApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourseApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class EnrollmentsController : ControllerBase
    {
        private readonly IEnrollmentService _service;

        public EnrollmentsController(IEnrollmentService service)
        {
            _service = service;
        }

        // Only Admin and Instructor can list all enrollments
        [HttpGet]
        [Authorize(Roles = "Admin,Instructor")]
        public async Task<ActionResult<List<EnrollmentResponseDto>>> GetAll()
            => Ok(await _service.GetAllAsync());

        // Any authenticated user can look up a specific enrollment
        [HttpGet("{id}")]
        public async Task<ActionResult<EnrollmentResponseDto>> GetById(int id)
        {
            var enrollment = await _service.GetByIdAsync(id);
            return enrollment == null ? NotFound() : Ok(enrollment);
        }

        // Any authenticated user (including User role) can create an enrollment
        [HttpPost]
        public async Task<ActionResult<EnrollmentResponseDto>> Create(CreateEnrollmentDto dto)
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        // Only Admin and Instructor can update grades
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Instructor")]
        public async Task<ActionResult<EnrollmentResponseDto>> Update(int id, UpdateEnrollmentDto dto)
        {
            var updated = await _service.UpdateAsync(id, dto);
            return updated == null ? NotFound() : Ok(updated);
        }

        // Only Admin can remove enrollments
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            return deleted ? NoContent() : NotFound();
        }
    }
}
