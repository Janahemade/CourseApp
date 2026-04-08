namespace CourseApp.DTOS
{
    public class InstructorProfileResponseDto
    {
        public int Id { get; set; }
        public string Bio { get; set; } = string.Empty;
        public string OfficeLocation { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public DateTime HireDate { get; set; }
    }
}
