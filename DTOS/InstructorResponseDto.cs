namespace CourseApp.DTOS
{
    public class InstructorResponseDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public InstructorProfileResponseDto? Profile { get; set; }
    }
}
