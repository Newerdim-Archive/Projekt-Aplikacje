using System;
using System.Collections.Generic;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Todo.Helper;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Todo.Models;
using System.Security.Claims;
using AutoMapper;
using Todo.Data;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Http;
using System.Security.Principal;
using System.Text.RegularExpressions;
using Projekt_Aplikacje.Helper;
using Todo.Dto;
using Todo.Dto.User;

namespace Todo.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly AppSettings _appSettings;

        public UserController(IUnitOfWork uow, IOptions<AppSettings> appSettings, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userInDb = await _uow.Auth.LoginAsync(userForLoginDto.Username, userForLoginDto.Password);

            if (userInDb == null)
                return NotFound("Nazwa użytkownika lub hasło są nieprawidłowe");

            var accessToken = GenerateJwtToken(userInDb, _appSettings.AccessTokenSecret, 0, 1);
            var refreshToken = GenerateJwtToken(userInDb, _appSettings.RefreshTokenSecret, 5, 0, true);

            return Ok(new { refreshToken, accessToken });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegistrationDto userForRegistrationDto)
        {
            if (await _uow.Auth.UserExistAsync(userForRegistrationDto.Username))
                return BadRequest("Użytkownik o takiej nazwie już istnieje");

            var userToCreate = _mapper.Map<User>(userForRegistrationDto);

            var createdUser = await _uow.Auth.RegisterAsync(userToCreate, userForRegistrationDto.Password);

            createdUser.CreateDate = DateTime.Now;

            await _uow.SaveAsync();

            return NoContent();
        }

        #region Maybe later

        //[HttpPost("change-password")]
        //public async Task<IActionResult> ChangePassword(UserForChangePasswordDto userForChangePassword)
        //{
        //    var userInDb = await _uow.Auth.GetUserByIdAsync((int)GetUserIdFromToken());

        //    if (userInDb == null)
        //        return NotFound("User not found");

        //    var result = _uow.Auth.VerifyPasswordHash(userForChangePassword.Password, userInDb.PasswordHash, userInDb.PasswordSalt);

        //    if (!result)
        //        return Unauthorized("Password is not valid");

        //    _uow.Auth.ChangePassword(userInDb, userForChangePassword.NewPassword);

        //    await _uow.SaveAsync();

        //    return NoContent();
        //}

        //[AllowAnonymous]
        //[HttpPost("forgot-password")]
        //public async Task<IActionResult> ForgotPassword(ForgotPasswordDto forgotPasswordDto)
        //{
        //    var userInDb = await _uow.Auth.GetUserByEmailAsync(forgotPasswordDto.Email);

        //    if (userInDb == null)
        //        return NotFound("User not found");

        //    var forgotPasswordToken = GenerateJwtToken(userInDb, _appSettings.ForgotPasswordTokenSecret, 0, 15, true);

        //    _emailSender.SendEmail(new Message(
        //        new string[] { userInDb.Email },
        //        "Forgot password",
        //        $"{forgotPasswordDto.ReturnUrl}/{forgotPasswordToken}"
        //    ));

        //    return NoContent();
        //}

        //[AllowAnonymous]
        //[HttpPost("recovery-password/{token}")]
        //public async Task<IActionResult> RecoveryPassword(string token, RecoveryPasswordDto recoveryPasswordDto)
        //{
        //    var userId = GetUserIdFromToken(token);

        //    if (userId == null)
        //        return NotFound("User id in token does not exists");

        //    var userInDb = await _uow.Auth.GetUserByIdAsync((int)userId);

        //    if (userInDb == null)
        //        return NotFound("User from token does not exists");

        //    var tokenIsValid = ValidateToken(token, userInDb, _appSettings.ForgotPasswordTokenSecret, true);

        //    if (!tokenIsValid)
        //        return BadRequest("Token is invalid");

        //    _uow.Auth.ChangePassword(userInDb, recoveryPasswordDto.NewPassword);

        //    await _uow.SaveAsync();

        //    return NoContent();
        //}

        #endregion

        [AllowAnonymous]
        [HttpGet("refresh-tokens")]
        public async Task<IActionResult> RefreshTokens()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
                return NotFound("Nie znaleziono refresh tokenu");

            var userId = GetUserIdFromToken(refreshToken);

            if (userId == null)
                return NotFound("Użytkownik o takim id nie istnieje");

            var userInDb = await _uow.Auth.GetUserByIdAsync((int)userId);

            if (userInDb == null)
                return NotFound("Użytkownik z tokenu nie istnieje");

            if (!ValidateToken(refreshToken, userInDb, _appSettings.RefreshTokenSecret, true))
                return BadRequest("Token jest nieprawidłowy");

            var accessToken = GenerateJwtToken(userInDb, _appSettings.AccessTokenSecret, 0, 1);
            refreshToken = GenerateJwtToken(userInDb, _appSettings.RefreshTokenSecret, 5, 0, true);

            return Ok(new { refreshToken, accessToken });
        }

        private int? GetUserIdFromToken(string token = null)
        {
            Claim userIdClaim;

            if (string.IsNullOrEmpty(token))
            {
                userIdClaim = User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier);
            }
            else
            {
                var tokenHandler = new JwtSecurityTokenHandler();

                try
                {
                    var decodedToken = tokenHandler.ReadJwtToken(token);
                    userIdClaim = decodedToken?.Claims.FirstOrDefault(c => c.Type == "nameid");
                }
                catch
                {
                    return null;
                }
            }

            return int.Parse(userIdClaim?.Value);
        }

        private bool ValidateToken(string token, User user, string secret, bool usePasswordHash = false)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            byte[] key;

            if (usePasswordHash)
                key = Encoding.ASCII.GetBytes(secret + Encoding.ASCII.GetString(user.PasswordHash));
            else
                key = Encoding.ASCII.GetBytes(secret);

            var validationParameters = new TokenValidationParameters()
            {
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero,
                IssuerSigningKey = new SymmetricSecurityKey(key)
            };

            SecurityToken validatedToken;

            try
            {
                IPrincipal principal = tokenHandler.ValidateToken(token, validationParameters, out validatedToken);
            }
            catch
            {
                return false;
            }

            return true;
        }

        /// <summary>
        /// Generete Jwt token
        /// </summary>
        /// <param name="user"></param>
        /// <param name="secret"></param>
        /// <param name="days">How many days token will be valid</param>
        /// <param name="minutes">How many minutes token will be valid</param>
        /// <param name="usePasswordHash">Use password hash in secret key</param>
        /// <returns>Jwt token</returns>
        private string GenerateJwtToken(User user, string secret,
            int days, int minutes, bool usePasswordHash = false)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            byte[] key;

            if (usePasswordHash)
                key = Encoding.ASCII.GetBytes(secret + Encoding.ASCII.GetString(user.PasswordHash));
            else
                key = Encoding.ASCII.GetBytes(secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username)
                }),
                Expires = DateTime.UtcNow.AddDays(days).AddMinutes(minutes),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
