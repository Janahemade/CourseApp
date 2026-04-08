using CourseApp.DTOS;
using CourseApp.Models;
using Microsoft.EntityFrameworkCore;

namespace CourseApp.Services
{
    public class StudentService : IStudentService
    {
        private readonly AppDbContext _context;

        public StudentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<StudentResponseDto>> GetAllAsync()
        {
            return await _context.Students
                .AsNoTracking()
                .Select(s => new StudentResponseDto
                {
                    Id = s.Id,
                    FirstName = s.FirstName,
                    LastName = s.LastName,
                    Email = s.Email,
                    DateOfBirth = s.DateOfBirth
                })
                .ToListAsync();
        }

        public async Task<StudentResponseDto?> GetByIdAsync(int id)
        {
            return await _context.Students
                .AsNoTracking()
                .Where(s => s.Id == id)
                .Select(s => new StudentResponseDto
                {
                    Id = s.Id,
                    FirstName = s.FirstName,
                    LastName = s.LastName,
                    Email = s.Email,
                    DateOfBirth = s.DateOfBirth
                })
                .FirstOrDefaultAsync();
        }

        public async Task<StudentResponseDto> CreateAsync(CreateStudentDto dto)
        {
            var student = new Student
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                DateOfBirth = dto.DateOfBirth
            };

            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return new StudentResponseDto
            {
                Id = student.Id,
                FirstName = student.FirstName,
                LastName = student.LastName,
                Email = student.Email,
                DateOfBirth = student.DateOfBirth
            };
        }

        public async Task<StudentResponseDto?> UpdateAsync(int id, UpdateStudentDto dto)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null) return null;

            student.FirstName = dto.FirstName;
            student.LastName = dto.LastName;
            student.Email = dto.Email;
            student.DateOfBirth = dto.DateOfBirth;

            await _context.SaveChangesAsync();

            return new StudentResponseDto
            {
                Id = student.Id,
                FirstName = student.FirstName,
                LastName = student.LastName,
                Email = student.Email,
                DateOfBirth = student.DateOfBirth
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null) return false;

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
