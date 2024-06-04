using EasySale.Server.Interfaces;
using EasySale.Server.Models.DTO.Auth;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace EasySale.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MyPolicy")]
    public class AuthController : ControllerBase
    {

        private readonly IAuthRepository _authRepository;


        public AuthController(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
            
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterRequestDTO request)
        {
           
            try
            {
            var newUser = await _authRepository.CreateNewUserAsync(request);
            return Ok(newUser);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
          
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginRequestDTO request)
        {

            try
            {
                var user = await _authRepository.LoginUserAsync(request);
                return Ok(user);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        [HttpPost("username-exist")]
        public async Task<IActionResult> CheckUsernameExist([FromBody] CheckUsernameRequestDTO checkUsernameRequestDTO)
        {

            var exist = await _authRepository.CheckUsernameExistAsync(checkUsernameRequestDTO);
            return Ok(exist);
        }
        [HttpPost("refresh-token")]
        public async Task<IActionResult> GenerateRefreshToken([FromBody] RefreshTokenRequestDTO refreshTokenDTO)
        {
            var res= await _authRepository.GenerateRefreshTokenAsync(refreshTokenDTO);
            if(res==null)
                return Unauthorized();

            return Ok(res);
        }
    }
}
