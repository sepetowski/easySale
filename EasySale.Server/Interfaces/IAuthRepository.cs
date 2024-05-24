using EasySale.Server.Models.DTO.Auth;

namespace EasySale.Server.Interfaces
{
    public interface IAuthRepository
    {


        Task<UserRegisterResponseDTO?> CreateNewUserAsync(UserRegisterRequestDTO userRegisterRequestDTO);
        Task<UserLoginResponseDTO?> LoginUserAsync(UserLoginRequestDTO userLoginRequestDTO);
        Task<CheckUsernameResponseDTO> CheckUsernameExistAsync(CheckUsernameRequestDTO checkUsernameRequestDTO);
        Task<RefreshTokenResponseDTO?> GenerateRefreshTokenAsync(RefreshTokenRequestDTO refreshTokenRequestDTO);


    }
}
