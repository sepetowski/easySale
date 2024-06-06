using EasySale.Server.Models.DTO.UserUpdates;
using System.Runtime.CompilerServices;

namespace EasySale.Server.Interfaces
{
    public interface IUserUpdateRepository
    {

        Task<UpdateProfileImageResponseDTO> UpdateProfileImageAsync(UpdateProfileImageRequestDTO requestDTO);
        Task<DeleteProfileImageResponseDTO> DeleteProfileImageAsync(DeleteProfileImageRequestDTO deleteProfileImageRequestDTO);
    }
}
