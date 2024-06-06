using System.ComponentModel.DataAnnotations;

namespace EasySale.Server.Models.DTO.UserUpdates
{
    public class DeleteProfileImageRequestDTO
    {
        [Required]
        public string UserId { get; set; }
    }
}
