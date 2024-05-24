using Azure.Core;
using EasySale.Server.Data;
using EasySale.Server.Interfaces;
using EasySale.Server.Models.Domain;
using EasySale.Server.Models.DTO.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace EasySale.Server.Repositories
{
    public class AuthRepository : IAuthRepository
    {

        private readonly IConfiguration _config;
        private readonly DataContext _context;

        public AuthRepository(IConfiguration config,DataContext context)
        {
            _config = config;   
            _context = context;
        }

        public async Task<CheckUsernameResponseDTO> CheckUsernameExistAsync(CheckUsernameRequestDTO checkUsernameRequestDTO)
        {
            var userExist = await _context.Users.FirstOrDefaultAsync((user) => user.Username == checkUsernameRequestDTO.Username);

           
            var res = new CheckUsernameResponseDTO { Exist = userExist != null };
           
            return  res;
        }


        public async Task<UserLoginResponseDTO?> LoginUserAsync(UserLoginRequestDTO userLoginRequestDTO)
        {
            string username = userLoginRequestDTO.Username;

            var userExist= await _context.Users.FirstOrDefaultAsync((user) => user.Username == username);

            if (userExist == null)
            {
                throw new Exception("User not found");
            }


            if (!VerifyPasswordHash(userLoginRequestDTO.Password, userExist.PasswordHash, userExist.PasswordSalt))
            {
                throw new Exception("Password is incorrect.");
            }

            var tokenExpires = DateTime.Now.AddMinutes(60);
            string token = GenerateJwtToken(tokenExpires,userExist.Username,userExist.Email);

            string refreshToken = CreateRandomToken();

            userExist.RefreshToken = refreshToken;
            userExist.RefreshTokenExpires = DateTime.Now.AddDays(1);

            await _context.SaveChangesAsync();

            var newUserResponse = new UserLoginResponseDTO
            {
                Id = userExist.Id,
                Email = userExist.Email,
                Username = userExist.Username,
                FirstName=userExist.FirstName,
                LastName = userExist.LastName,
                JSONWebToken = token,
                JSONWebTokenExpires = tokenExpires,
                RefreshToken=refreshToken,
                
            };

            return newUserResponse;


        }


        public async Task<UserRegisterResponseDTO?> CreateNewUserAsync(UserRegisterRequestDTO userRegisterRequestDTO)
        {

            string username= userRegisterRequestDTO.Username;
            string email = userRegisterRequestDTO.Email;

                

            var existEmail = await _context.Users.FirstOrDefaultAsync((user) => user.Email == email);
            if (existEmail != null)
            {
                throw new Exception("This email exit");
            }
           
            var existUsername = await _context.Users.FirstOrDefaultAsync((user) => user.Username == username);
            if (existUsername != null)
            {
   
                throw new Exception("This username is already taken");
            }

            
            CreatePasswordHash(userRegisterRequestDTO.Password,out byte[] passwordHash,out byte[] passwordSalt);

            


            var user = new User
            {
                Id = Guid.NewGuid(),
                CreatedAt = DateTime.UtcNow,
                Username = userRegisterRequestDTO.Username,
                Email = userRegisterRequestDTO.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                VerificationToken = CreateRandomToken()
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            var newUserResponse=new UserRegisterResponseDTO
            {
                Id = user.Id,
                Email = user.Email,
                Username=user.Username,
               
            };
            
            return newUserResponse;

        }

        public async Task<RefreshTokenResponseDTO?> GenerateRefreshTokenAsync(RefreshTokenRequestDTO refreshTokenRequestDTO)
        {
            var principal = GetTokenPrincipal(refreshTokenRequestDTO.Token);
            var username = principal?.Identity?.Name;

            if(username == null) {
                return null;
            }

            var user= await _context.Users.FirstOrDefaultAsync((user=>user.Username == username));

            if (user is null || user.RefreshToken != refreshTokenRequestDTO.RefreshToken || user.RefreshTokenExpires < DateTime.Now)
                return null;

            var tokenExpires = DateTime.Now.AddMinutes(60);
            string token = GenerateJwtToken(tokenExpires, user.Username, user.Email);

            string refreshToken = CreateRandomToken();
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpires = DateTime.Now.AddDays(1);

            await _context.SaveChangesAsync();

            var res = new RefreshTokenResponseDTO
            {
                Token=token,
                RefreshToken = refreshToken,

            };

            return res;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac
                    .ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac
                    .ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        

        private string CreateRandomToken()
        {
            return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
        }
        private string GenerateJwtToken(DateTime tokenExpires,string username,string email)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new (ClaimTypes.Name,username),
                new (ClaimTypes.Email,email)
            };

            var secToken = new JwtSecurityToken(
              _config["Jwt:Issuer"],
              _config["Jwt:Audience"],
              claims,
              null,
              expires: tokenExpires,
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(secToken);

           
        }
        private ClaimsPrincipal? GetTokenPrincipal(string token)
        {

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));

            var validation = new TokenValidationParameters
            {
                IssuerSigningKey = securityKey,
                ValidateLifetime = false,
                ValidateActor = false,
                ValidateIssuer = false,
                ValidateAudience = false,
            };
            return new JwtSecurityTokenHandler().ValidateToken(token, validation, out _);
        }
    }
    
}
