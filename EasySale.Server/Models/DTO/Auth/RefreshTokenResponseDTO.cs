using System.ComponentModel.DataAnnotations;

namespace EasySale.Server.Models.DTO.Auth
{
    public class RefreshTokenResponseDTO
    {
       
        public required string Token { get; set; }
        public required DateTime TokenExpires { get; set; }
        public required string RefreshToken { get; set; }
    }
}
