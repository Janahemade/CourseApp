using CourseApp.DTOS;
using CourseApp.Models;
using Microsoft.EntityFrameworkCore;

namespace CourseApp.Services
{
    public class EnrollmentService : IEnrollmentService
    {
        private readonly AppDbContext _context;

        public EnrollmentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<EnrollmentResponseDto>> GetAllAsync()
        {
            return await _context.Enrollments
                .AsNoTracking()
                .Select(e => new EnrollmentResponseDto
                {
                    Id = e.Id,
                    StudentName = e.Student.FirstName + " " + e.Student.LastName,
                    CourseTitle = e.Course.Title,
                    Grade = e.Grade,
                    EnrolledAt = e.EnrolledAt
                })
                .ToListAsync();
        }

        public async Task<EnrollmentResponseDto?> GetByIdAsync(int id)
        {
            return await _context.Enrollments
                .AsNoTracking()
                .Where(e => e.Id == id)
                .Select(e => new EnrollmentResponseDto
                {
                    Id = e.Id,
                    StudentName = e.Student.FirstName + " " + e.Student.LastName,
                    CourseTitle = e.Course.Title,
                    Grade = e.Grade,
                    EnrolledAt = e.EnrolledAt
                })
                .FirstOrDefaultAsync();
        }

        public async Task<EnrollmentResponseDto> CreateAsync(CreateEnrollmentDto dto)
        {
            var enrollment = new Enrollment
            {
                StudentId = dto.StudentId,
                CourseId = dto.CourseId,
                EnrolledAt = DateTime.UtcNow
            };

            _context.Enrollments.Add(enrollment);
            await _context.SaveChangesAsync();

            return (await GetByIdAsync(enrollment.Id))!;
        }

        public async Task<EnrollmentResponseDto?> UpdateAsync(int id, UpdateEnrollmentDto dto)
        {
            var enrollment = await _context.Enrollments.FindAsync(id);
            if (enrollment == null) return null;

            enrollment.Grade = dto.Grade;

            await _context.SaveChangesAsync();

            return (await GetByIdAsync(enrollment.Id))!;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var enrollment = await _context.Enrollments.FindAsync(id);
            if (enrollment == null) return false;

            _context.Enrollments.Remove(enrollment);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
