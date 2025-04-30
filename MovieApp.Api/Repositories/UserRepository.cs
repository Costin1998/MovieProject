namespace MovieApp.Api.Repositories
{
    using MongoDB.Driver;
    using MovieApp.Api.Models;
    using MovieApp.Api.Data;
    using System.Threading.Tasks;

    public class UserRepository : IUserRepository
    {
        private readonly MongoDbContext _context;

        public UserRepository(MongoDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            return await _context.Users
                .Find(u => u.Email == email)
                .FirstOrDefaultAsync();
        }

        public async Task<User> GetByIdAsync(string id)
        {
            return await _context.Users
                .Find(u => u.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task<User> GetByRefreshTokenAsync(string refreshToken)
        {
            return await _context.Users
                .Find(u => u.RefreshToken == refreshToken)
                .FirstOrDefaultAsync();
        }

        public async Task CreateUserAsync(User user)
        {
            await _context.Users.InsertOneAsync(user);
        }

        public async Task UpdateUserAsync(User user)
        {
            await _context.Users.ReplaceOneAsync(u => u.Id == user.Id, user);
        }
    }
}
