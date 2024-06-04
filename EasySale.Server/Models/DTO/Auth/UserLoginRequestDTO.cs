using System.ComponentModel.DataAnnotations;

namespace EasySale.Server.Models.DTO.Auth
{
    public class UserLoginRequestDTO
    {
        [MinLength(4), MaxLength(30), Required]
        public string Username { get; set; }

        [Required, RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$",
        ErrorMessage = "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, and one digit.")]
        public string Password { get; set; }
     
    }
}
