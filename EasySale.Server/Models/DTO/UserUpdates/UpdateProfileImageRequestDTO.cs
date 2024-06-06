using System.ComponentModel.DataAnnotations;

namespace EasySale.Server.Models.DTO.UserUpdates
{
    public class UpdateProfileImageRequestDTO
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public IFormFile ImageFile { get; set; }
    }
}
