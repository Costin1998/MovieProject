namespace MovieApp.Api.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using MovieApp.Api.DTOs;
    using MovieApp.Api.Services.Interfaces;
    using System.Threading.Tasks;

    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentsController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet("{movieId}")]
        public async Task<IActionResult> GetComments(string movieId)
        {
            var comments = await _commentService.GetCommentsAsync(movieId);
            return Ok(comments);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddComment(AddCommentDto comment)
        {
            await _commentService.AddCommentAsync(comment);
            return Ok();
        }
    }
}
