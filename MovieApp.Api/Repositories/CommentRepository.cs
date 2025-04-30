namespace MovieApp.Api.Repositories
{
    using MongoDB.Driver;
    using MovieApp.Api.Data;
    using MovieApp.Api.DTOs;
    using MovieApp.Api.Models;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class CommentRepository : ICommentRepository
    {
        private readonly MongoDbContext _context;

        public CommentRepository(MongoDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Comment>> GetCommentsByMovieIdAsync(string movieId)
        {
            return await _context.Comments.Find(c => c.MovieId == movieId).ToListAsync();
        }

        public async Task AddCommentAsync(AddCommentDto comment)
        {
            Comment newComment = new Comment
            {
                MovieId = comment.MovieId,
                Content = comment.Content,
                UserId = comment.UserId,
                UserName = comment.UserName,
                CreatedAt = DateTime.Now,
            };

            await _context.Comments.InsertOneAsync(newComment);
        }
    }
}
