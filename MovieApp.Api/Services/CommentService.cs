namespace MovieApp.Api.Services
{
    using MovieApp.Api.DTOs;
    using MovieApp.Api.Models;
    using MovieApp.Api.Repositories;
    using MovieApp.Api.Services.Interfaces;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _repository;

        public CommentService(ICommentRepository repository)
        {
            _repository = repository;
        }

        public Task AddCommentAsync(AddCommentDto comment)
        {
            return _repository.AddCommentAsync(comment);
        }

        public Task<IEnumerable<Comment>> GetCommentsAsync(string movieId)
        {
            return _repository.GetCommentsByMovieIdAsync(movieId);
        }

       
    }
}
