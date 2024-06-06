

namespace EasySale.Server.Models.DTO.UserUpdates
{
    public class UpdateUserDetailsResponseDTO
    {
        
        public required string Username { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }
}
