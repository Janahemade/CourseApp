using System.ComponentModel.DataAnnotations;

namespace CourseApp.DTOS
{
    public class UpdateInstructorProfileDto
    {
        [Required]
        [MaxLength(500)]
        public string Bio { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string OfficeLocation { get; set; } = string.Empty;

        [Required]
        [Phone]
        [MaxLength(20)]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        public DateTime HireDate { get; set; }
    }
}
