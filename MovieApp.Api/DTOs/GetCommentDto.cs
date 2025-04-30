using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApp.Api.DTOs
{
    public class GetCommentDto
    {
        public string Id { get; set; }

        public int MovieId { get; set; }

        public string UserId { get; set; }

        public string UserName { get; set; }

        public string Content { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
