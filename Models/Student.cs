namespace CourseApp.Models
{
   
        public class Student
        {
            public int Id { get; set; }
            public string FirstName { get; set; } = string.Empty;
            public string LastName { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
            public DateTime DateOfBirth { get; set; }

            // Many-to-Many: Student ↔ Course (via Enrollment)
            public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
        }
    }

