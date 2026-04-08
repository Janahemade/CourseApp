using System.ComponentModel.DataAnnotations;

namespace CourseApp.DTOS
{
    public class CreateEnrollmentDto
    {
        [Required]
        public int StudentId { get; set; }

        [Required]
        public int CourseId { get; set; }
    }
}
