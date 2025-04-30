namespace MovieApp.Api.Services
{
    using MovieApp.Api.Models;
    using MovieApp.Api.DTOs;
    using System.Threading.Tasks;

    public interface IUserService
    {
        Task<bool> RegisterAsync(RegisterDto request);
        Task<User> AuthenticateAsync(string email, string password);
        Task<User> GetUserByRefreshTokenAsync(string refreshToken);
        Task UpdateUserAsync(User user);
    }
}
