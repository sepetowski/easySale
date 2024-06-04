using EasySale.Server.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace EasySale.Server.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> dbContextOptions) : base(dbContextOptions) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("SQL_Latin1_General_CP1_CS_AS");

           
        }


        public DbSet<User> Users => Set<User>();
    }
}
