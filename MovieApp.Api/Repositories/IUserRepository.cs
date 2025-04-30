namespace MovieApp.Api.Repositories
{
    using MovieApp.Api.Models;
    using System.Threading.Tasks;

    public interface IUserRepository
    {
        Task<User> GetByEmailAsync(string email);
        Task<User> GetByIdAsync(string id);
        Task<User> GetByRefreshTokenAsync(string refreshToken);
        Task CreateUserAsync(User user);
        Task UpdateUserAsync(User user);
    }
}
