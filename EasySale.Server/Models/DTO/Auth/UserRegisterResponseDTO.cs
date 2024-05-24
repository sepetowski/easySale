namespace EasySale.Server.Models.DTO.Auth
{
    public class UserRegisterResponseDTO
    {
        public required Guid Id { get; set; }
        public required string Username { get; set; }
        public required string Email { get; set; }
     
    }
}
