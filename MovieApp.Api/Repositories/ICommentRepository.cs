namespace MovieApp.Api.Repositories
{
    using MovieApp.Api.DTOs;
    using MovieApp.Api.Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ICommentRepository
    {
        Task<IEnumerable<Comment>> GetCommentsByMovieIdAsync(string movieId);
        Task AddCommentAsync(AddCommentDto comment);
    }
}
