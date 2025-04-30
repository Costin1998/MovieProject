namespace MovieApp.Api.Services.Interfaces
{
    using MovieApp.Api.DTOs;
    using MovieApp.Api.Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ICommentService
    {
        Task<IEnumerable<Comment>> GetCommentsAsync(string movieId);
        Task AddCommentAsync(AddCommentDto comment);
    }
}
