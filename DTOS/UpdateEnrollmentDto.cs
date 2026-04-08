using System.ComponentModel.DataAnnotations;

namespace CourseApp.DTOS
{
    public class UpdateEnrollmentDto
    {
        [MaxLength(5)]
        public string? Grade { get; set; }
    }
}
