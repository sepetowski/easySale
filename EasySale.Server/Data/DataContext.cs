using EasySale.Server.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace EasySale.Server.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> dbContextOptions) : base(dbContextOptions) { }

        public DbSet<User> Users => Set<User>();
    }
}
