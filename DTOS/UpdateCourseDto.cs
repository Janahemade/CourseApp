using System.ComponentModel.DataAnnotations;

namespace CourseApp.DTOS
{
    public class UpdateCourseDto
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(10)]
        public string Code { get; set; } = string.Empty;

        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;

        [Required]
        [Range(1, 6)]
        public int Credits { get; set; }

        [Required]
        public int InstructorId { get; set; }
    }
}
