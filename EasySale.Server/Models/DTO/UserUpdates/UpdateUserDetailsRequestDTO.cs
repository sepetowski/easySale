using System.ComponentModel.DataAnnotations;


namespace EasySale.Server.Models.DTO.UserUpdates
{
    public class UpdateUserDetailsRequestDTO
    {
        [Required]
        public string Id { get; set; }

        [MinLength(4), MaxLength(30), Required]
        public  string Username { get; set; }

        [MaxLength(50)]
        public string? FirstName { get; set; }

        [MaxLength(100)]
        public string? LastName { get; set; }

   
    }
}
