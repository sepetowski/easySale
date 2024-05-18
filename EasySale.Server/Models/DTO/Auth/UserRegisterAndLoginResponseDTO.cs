namespace EasySale.Server.Models.DTO.Auth
{
    public class UserRegisterAndLoginResponseDTO
    {
        public required Guid Id { get; set; }
        public required string Email { get; set; }
        public required string JwtToken { get; set; }
        public required DateTime JwtTokenExpires { get; set; }

    }
}
