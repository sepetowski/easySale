namespace EasySale.Server.Models.DTO.Auth
{
    public class UserRegisterAndLoginResponseDTO
    {
        public required Guid Id { get; set; }
        public required string Email { get; set; }
        public required string JSONWebToken { get; set; }
        public required DateTime JSONWebTokenExpires { get; set; }

    }
}
