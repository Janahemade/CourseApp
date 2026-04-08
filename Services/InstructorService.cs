using CourseApp.DTOS;
using CourseApp.Models;
using Microsoft.EntityFrameworkCore;

namespace CourseApp.Services
{
    public class InstructorService : IInstructorService
    {
        private readonly AppDbContext _context;

        public InstructorService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<InstructorResponseDto>> GetAllAsync()
        {
            return await _context.Instructors
                .AsNoTracking()
                .Select(i => new InstructorResponseDto
                {
                    Id = i.Id,
                    FirstName = i.FirstName,
                    LastName = i.LastName,
                    Email = i.Email,
                    Profile = i.Profile == null ? null : new InstructorProfileResponseDto
                    {
                        Id = i.Profile.Id,
                        Bio = i.Profile.Bio,
                        OfficeLocation = i.Profile.OfficeLocation,
                        PhoneNumber = i.Profile.PhoneNumber,
                        HireDate = i.Profile.HireDate
                    }
                })
                .ToListAsync();
        }

        public async Task<InstructorResponseDto?> GetByIdAsync(int id)
        {
            return await _context.Instructors
                .AsNoTracking()
                .Where(i => i.Id == id)
                .Select(i => new InstructorResponseDto
                {
                    Id = i.Id,
                    FirstName = i.FirstName,
                    LastName = i.LastName,
                    Email = i.Email,
                    Profile = i.Profile == null ? null : new InstructorProfileResponseDto
                    {
                        Id = i.Profile.Id,
                        Bio = i.Profile.Bio,
                        OfficeLocation = i.Profile.OfficeLocation,
                        PhoneNumber = i.Profile.PhoneNumber,
                        HireDate = i.Profile.HireDate
                    }
                })
                .FirstOrDefaultAsync();
        }

        public async Task<InstructorResponseDto> CreateAsync(CreateInstructorDto dto)
        {
            var instructor = new Instructor
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email
            };

            _context.Instructors.Add(instructor);
            await _context.SaveChangesAsync();

            return new InstructorResponseDto
            {
                Id = instructor.Id,
                FirstName = instructor.FirstName,
                LastName = instructor.LastName,
                Email = instructor.Email
            };
        }

        public async Task<InstructorResponseDto?> UpdateAsync(int id, UpdateInstructorDto dto)
        {
            var instructor = await _context.Instructors.FindAsync(id);
            if (instructor == null) return null;

            instructor.FirstName = dto.FirstName;
            instructor.LastName = dto.LastName;
            instructor.Email = dto.Email;

            await _context.SaveChangesAsync();

            return new InstructorResponseDto
            {
                Id = instructor.Id,
                FirstName = instructor.FirstName,
                LastName = instructor.LastName,
                Email = instructor.Email
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var instructor = await _context.Instructors.FindAsync(id);
            if (instructor == null) return false;

            _context.Instructors.Remove(instructor);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
