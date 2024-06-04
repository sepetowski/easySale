using System.ComponentModel.DataAnnotations;

namespace EasySale.Server.Models.DTO.Auth
{
    public class RefreshTokenRequestDTO
    {
        [Required]
        public string Token { get; set; }
        [Required]
        public string RefreshToken { get; set; }
    }
}
