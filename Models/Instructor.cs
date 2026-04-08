namespace CourseApp.Models
{
    public class Instructor
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        // One-to-One: Instructor → InstructorProfile
        public InstructorProfile? Profile { get; set; }

        // One-to-Many: Instructor → Courses
        public ICollection<Course> Courses { get; set; } = new List<Course>();
    }
}
