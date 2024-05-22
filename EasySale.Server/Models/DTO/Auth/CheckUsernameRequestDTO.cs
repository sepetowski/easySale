using System.ComponentModel.DataAnnotations;

namespace EasySale.Server.Models.DTO.Auth
{
    public class CheckUsernameRequestDTO
    {
        [MinLength(4), MaxLength(30), Required]
        public string Username { get; set; }
    }
}
