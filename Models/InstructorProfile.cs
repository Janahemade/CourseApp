namespace CourseApp.Models
{
  
        public class InstructorProfile
        {
            public int Id { get; set; }
            public string Bio { get; set; } = string.Empty;
            public string OfficeLocation { get; set; } = string.Empty;
            public string PhoneNumber { get; set; } = string.Empty;
            public DateTime HireDate { get; set; }

            // One-to-One FK back to Instructor
            public int InstructorId { get; set; }
            public Instructor Instructor { get; set; } = null!;
        }
    }

