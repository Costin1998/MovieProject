namespace MovieApp.Api.Data
{
    using Microsoft.Extensions.Configuration;
    using MongoDB.Driver;
    using MovieApp.Api.Models;

    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IConfiguration configuration)
        {
            var client = new MongoClient(configuration["MongoDb:ConnectionString"]);
            _database = client.GetDatabase(configuration["MongoDb:DatabaseName"]);
        }

        public IMongoCollection<User> Users => _database.GetCollection<User>("Users");
        public IMongoCollection<Comment> Comments => _database.GetCollection<Comment>("Comments");
    }
}
