using EasySale.Server.Models.DTO.Auth;

namespace EasySale.Server.Interfaces
{
    public interface IAuthRepository
    {


        Task<UserRegisterAndLoginResponseDTO?> CreateNewUserAsync(UserRegisterRequestDTO userRegisterRequestDTO);
        Task<UserRegisterAndLoginResponseDTO?> LoginUserAsync(UserLoginRequestDTO userLoginRequestDTO);
        
    }
}
