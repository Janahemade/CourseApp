using CourseApp.DTOS;
using CourseApp.Models;
using Microsoft.EntityFrameworkCore;

namespace CourseApp.Services
{
    public class CourseService : ICourseService
    {
        private readonly AppDbContext _context;

        public CourseService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<CourseResponseDto>> GetAllAsync()
        {
            return await _context.Courses
                .AsNoTracking()
                .Select(c => new CourseResponseDto
                {
                    Id = c.Id,
                    Title = c.Title,
                    Code = c.Code,
                    Description = c.Description,
                    Credits = c.Credits,
                    InstructorName = c.Instructor.FirstName + " " + c.Instructor.LastName
                })
                .ToListAsync();
        }

        public async Task<CourseResponseDto?> GetByIdAsync(int id)
        {
            return await _context.Courses
                .AsNoTracking()
                .Where(c => c.Id == id)
                .Select(c => new CourseResponseDto
                {
                    Id = c.Id,
                    Title = c.Title,
                    Code = c.Code,
                    Description = c.Description,
                    Credits = c.Credits,
                    InstructorName = c.Instructor.FirstName + " " + c.Instructor.LastName
                })
                .FirstOrDefaultAsync();
        }

        public async Task<CourseResponseDto> CreateAsync(CreateCourseDto dto)
        {
            var course = new Course
            {
                Title = dto.Title,
                Code = dto.Code,
                Description = dto.Description,
                Credits = dto.Credits,
                InstructorId = dto.InstructorId
            };

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            // Reload with instructor name
            return (await GetByIdAsync(course.Id))!;
        }

        public async Task<CourseResponseDto?> UpdateAsync(int id, UpdateCourseDto dto)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null) return null;

            course.Title = dto.Title;
            course.Code = dto.Code;
            course.Description = dto.Description;
            course.Credits = dto.Credits;
            course.InstructorId = dto.InstructorId;

            await _context.SaveChangesAsync();

            return (await GetByIdAsync(course.Id))!;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null) return false;

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
    

