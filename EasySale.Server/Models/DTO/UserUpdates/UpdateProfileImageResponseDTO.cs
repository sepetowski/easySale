using System.ComponentModel.DataAnnotations;

namespace EasySale.Server.Models.DTO.UserUpdates
{
    public class UpdateProfileImageResponseDTO
    {
        public required string ProfileImageUrl { get; set; }
        
    }
}
