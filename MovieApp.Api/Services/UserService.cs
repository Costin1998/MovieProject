namespace MovieApp.Api.Services
{
    using MovieApp.Api.Models;
    using MovieApp.Api.DTOs;
    using MovieApp.Api.Repositories;
    using System.Threading.Tasks;
    using System;

    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> RegisterAsync(RegisterDto request)
        {
            var existingUser = await _userRepository.GetByEmailAsync(request.Email);
            if (existingUser != null)
            {
                return false;
            }

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var newUser = new User
            {
                Email = request.Email,
                UserName = request.UserName,
                PasswordHash = hashedPassword,
                RefreshToken = "",
                RefreshTokenExpiryTime = DateTime.UtcNow
            };

            await _userRepository.CreateUserAsync(newUser);
            return true;
        }

        public async Task<User> AuthenticateAsync(string email, string password)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            if (user == null) return null;

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            return isPasswordValid ? user : null;
        }

        public async Task<User> GetUserByRefreshTokenAsync(string refreshToken)
        {
            return await _userRepository.GetByRefreshTokenAsync(refreshToken);
        }

        public async Task UpdateUserAsync(User user)
        {
            await _userRepository.UpdateUserAsync(user);
        }
    }
}
