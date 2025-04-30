namespace MovieApp.Api.Services
{
    using MovieApp.Api.Models;

    public interface ITokenService
    {
        string CreateToken(User user);
        string CreateRefreshToken();
    }
}
