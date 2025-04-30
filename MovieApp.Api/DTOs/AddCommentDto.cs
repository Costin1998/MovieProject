using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApp.Api.DTOs
{
    public class AddCommentDto
    {
        public string MovieId { get; set; }

        public string UserId { get; set; }

        public string UserName { get; set; }

        public string Content { get; set; }
    }
}
