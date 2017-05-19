using Microsoft.EntityFrameworkCore;
using WriterApp.Data.Configuration;
using WriterApp.Data.Model;

namespace WriterApp.Data.Context
{
    public class WriterContext : DbContext
    {  
        public WriterContext(DbContextOptions<WriterContext> options)
          : base(options)
        {  
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);  
            modelBuilder.AddConfiguration(new WriterConfiguration());
            modelBuilder.AddConfiguration(new BookConfiguration());
            modelBuilder.AddConfiguration(new WriterBookConfiguration());
        }
        public DbSet<Writer> Writers { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<WriterBook> WriterBooks { get; set; }


    }
}
