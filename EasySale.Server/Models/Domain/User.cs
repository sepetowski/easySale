namespace EasySale.Server.Models.Domain
{
    public class User
    {
        public required Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public required string Email { get; set; }
        public required string Username { get; set; }
        public required byte[] PasswordHash { get; set; } = new byte[32];
        public required byte[] PasswordSalt { get; set; } = new byte[32];
        public string? VerificationToken { get; set; }
        public DateTime? VerifiedAt { get; set; }
        public string? PasswordResetToken { get; set; }
        public DateTime? ResetTokenExpires { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpires { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set;}
       
    }
}
