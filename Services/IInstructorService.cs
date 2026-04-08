using CourseApp.DTOS;

namespace CourseApp.Services
{
    public interface IInstructorService
    {
        Task<List<InstructorResponseDto>> GetAllAsync();
        Task<InstructorResponseDto?> GetByIdAsync(int id);
        Task<InstructorResponseDto> CreateAsync(CreateInstructorDto dto);
        Task<InstructorResponseDto?> UpdateAsync(int id, UpdateInstructorDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
