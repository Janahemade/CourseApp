using CourseApp.DTOS;

namespace CourseApp.Services
{
    public interface IEnrollmentService
    {
        Task<List<EnrollmentResponseDto>> GetAllAsync();
        Task<EnrollmentResponseDto?> GetByIdAsync(int id);
        Task<EnrollmentResponseDto> CreateAsync(CreateEnrollmentDto dto);
        Task<EnrollmentResponseDto?> UpdateAsync(int id, UpdateEnrollmentDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
