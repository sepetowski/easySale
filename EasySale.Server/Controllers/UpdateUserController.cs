using EasySale.Server.Interfaces;
using EasySale.Server.Models.DTO.UserUpdates;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EasySale.Server.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    [ApiController]
    public class UpdateUserController : ControllerBase
    {
        private readonly IUserUpdateRepository _userUpdateRepository;

        public UpdateUserController(IUserUpdateRepository userUpdateRepository)
        {
            _userUpdateRepository = userUpdateRepository;
        }

        [HttpPost("updateImage")]
        public async Task<IActionResult> UpdatePorifleImage([FromForm] UpdateProfileImageRequestDTO updateProfileImageRequestDTO)
        {
            try
            {
                var res = await _userUpdateRepository.UpdateProfileImageAsync(updateProfileImageRequestDTO);
                return Ok(res);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("deleteImage")]
        public async Task<IActionResult> DeletePorifleImage([FromBody] DeleteProfileImageRequestDTO deleteProfileImageRequestDTO)
        {
            var res =await _userUpdateRepository.DeleteProfileImageAsync(deleteProfileImageRequestDTO);
            if (!res.Success)
                return BadRequest(res);

            return Ok(res);
        }

        [HttpPost("updateDetails")]
        public async Task<IActionResult> UpdateUserDetails([FromBody] UpdateUserDetailsRequestDTO updateUserDetailsRequest)
        {
            try
            {
                var res = await _userUpdateRepository.UpdateUserDetailsAsync(updateUserDetailsRequest);
                return Ok(res);

            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
