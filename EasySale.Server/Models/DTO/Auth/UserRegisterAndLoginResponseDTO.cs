namespace EasySale.Server.Models.DTO.Auth
{
    public class UserRegisterAndLoginResponseDTO
    {
        public required Guid Id { get; set; }
        public required string Username { get; set; }
        public string? FirstName { get; set; } =string.Empty;
        public string? LastName { get; set; } = string.Empty;
        public required string Email { get; set; }
        public required string JSONWebToken { get; set; }
        public required DateTime JSONWebTokenExpires { get; set; }

    }
}
