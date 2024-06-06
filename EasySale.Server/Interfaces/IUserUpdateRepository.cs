using EasySale.Server.Models.DTO.UserUpdates;

namespace EasySale.Server.Interfaces
{
    public interface IUserUpdateRepository
    {

        Task<UpdateProfileImageResponseDTO> UpdateProfileImageAsync(UpdateProfileImageRequestDTO requestDTO);
    }
}
