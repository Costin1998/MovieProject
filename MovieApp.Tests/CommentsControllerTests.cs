using Xunit;
using Moq;
using MovieApp.Api.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using MovieApp.Api.Services.Interfaces;
using MovieApp.Api.DTOs;
using System.Collections.Generic;
using MovieApp.Api.Models;

public class CommentsControllerTests
{
    [Fact]
    public async Task AddComment_ReturnsOkResult()
    {
        // Arrange
        var mockService = new Mock<ICommentService>();
        var controller = new CommentsController(mockService.Object);

        var commentDto = new AddCommentDto
        {
            MovieId = "1",
            UserId = "123",
            UserName = "John Doe",
            Content = "Nice movie!"
        };

        // Act
        var result = await controller.AddComment(commentDto);

        // Assert
        var actionResult = Assert.IsType<OkResult>(result);
        mockService.Verify(s => s.AddCommentAsync(commentDto), Times.Once);
    }

    [Fact]
    public async Task GetComments_ReturnsCommentsForMovie()
    {
        // Arrange
        var movieId = "1";
        var mockService = new Mock<ICommentService>();
        mockService.Setup(s => s.GetCommentsAsync(movieId))
                   .ReturnsAsync(new List<Comment> { new Comment { Content = "Content" } });

        var controller = new CommentsController(mockService.Object);

        // Act
        var result = await controller.GetComments(movieId);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var comments = Assert.IsAssignableFrom<List<Comment>>(okResult.Value);
        Assert.Single(comments);
    }

}
