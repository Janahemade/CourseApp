using CourseApp.DTOS;

namespace CourseApp.Services
{
    public interface IStudentService
    {
        Task<List<StudentResponseDto>> GetAllAsync();
        Task<StudentResponseDto?> GetByIdAsync(int id);
        Task<StudentResponseDto> CreateAsync(CreateStudentDto dto);
        Task<StudentResponseDto?> UpdateAsync(int id, UpdateStudentDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
