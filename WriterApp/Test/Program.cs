using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Data.Entity.ModelConfiguration;


namespace Test
{
    class Program
    {

        static void Main(string[] args)
        {
            int pageSize = 4;
            int total = 5;
            int page = 1;
            using (var dbContext = new WriterContext())
            {
                var index = 1;
                var query1 = from wb in dbContext.WriterBooks
                             join b in dbContext.Books on wb.BookId equals b.Id
                             group b by wb.WriterId into g
                             select new { WriterId = g.Key, MaxDate = g.Max(x => x.PublishedDate).Year, MinDate = g.Min(x => x.PublishedDate).Year, Count = g.Count() };

                var query2 = from w in dbContext.Writers
                             join b in query1 on w.Id equals b.WriterId into pb
                             from p in pb.DefaultIfEmpty()
                             select new { Id = w.Id, FullName = w.LastName + " " + w.FirstName, Qty = p == null ? 0 : p.Count, MinDate = p == null ? (int?)null : p.MinDate, MaxDate = p == null ? (int?)null : p.MaxDate };

                var query3 = dbContext.WriterBooks.Join(dbContext.Books, wb => wb.BookId, b => b.Id, (wb, b) => new { wb, b })
                                                  .Where(wwb => wwb.wb.BookId == wwb.b.Id)
                                                  .GroupBy(g => g.wb.WriterId)
                                                  .Select(wwb => new { WriterId = wwb.Key, MaxDate = wwb.Max(b => b.b.PublishedDate).Year, MinDate = wwb.Min(b => b.b.PublishedDate).Year, Count = wwb.Count() });

                var query4 = dbContext.Writers.GroupJoin(query3, wb => wb.Id, w => w.WriterId, (wb, w) => new { wb, w })
                                                  .SelectMany(x => x.w.DefaultIfEmpty(),
                                                   (wb, w) => new
                                                   {                                                      
                                                       Id = wb.wb.Id,
                                                       FullName = wb.wb.LastName + " " + wb.wb.FirstName,
                                                       Qty = w == null ? 0 : w.Count,
                                                       MinDate = w == null ? (int?)null : w.MinDate,
                                                       MaxDate = w == null ? (int?)null : w.MaxDate
                                                   }).OrderBy(x => x.Qty).Skip(1).Take(pageSize);



                foreach (var l in query2)
                {
                    Console.WriteLine(l.Id + " " + l.Qty + " " + l.FullName + " " + l.MinDate);
                }
                Console.ReadKey();
            }
        }
    }
    public class Writer
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Biography { get; set; }
        public virtual ICollection<WriterBook> WriterBooks { get; set; }
    }
    public class WriterBook
    {
        public int BookId { get; set; }
        public virtual Book Book { get; set; }
        public int WriterId { get; set; }
        public virtual Writer Writer { get; set; }
    }
    public class WriterReport
    {
        public string FullName { get; set; }
        public int NumberOfBooks { get; set; }
        public Book FirstBook { get; set; }
        public Book LastBook { get; set; }

    }
    public class Book
    {
        public int Id { get; set; }
        public string Caption { get; set; }
        public DateTime PublishedDate { get; set; }
        public virtual ICollection<WriterBook> WriterBooks { get; set; }
    }
    public class WriterContext : DbContext
    {
        public WriterContext() : base("WriterContext")
        {
        }

        public DbSet<Writer> Writers { get; set; }
        public DbSet<WriterBook> WriterBooks { get; set; }
        public DbSet<Book> Books { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            modelBuilder.Configurations.Add(new WriterConfiguration());
            modelBuilder.Configurations.Add(new WriterBookConfiguration());
            modelBuilder.Configurations.Add(new BookConfiguration());
        }
    }
    public class BookConfiguration : EntityTypeConfiguration<Book>
    {
        public BookConfiguration()
        {
            ToTable("Book").HasKey(c => c.Id);
            Property(c => c.Caption).HasMaxLength(256).IsRequired();
            Property(c => c.PublishedDate).IsRequired();
            HasMany(c => c.WriterBooks);
        }

    }

    internal class WriterBookConfiguration : EntityTypeConfiguration<WriterBook>
    {
        public WriterBookConfiguration()
        {
            ToTable("WriterBook").HasKey(wb => new
            {
                wb.BookId,
                wb.WriterId
            });
            HasRequired(wb => wb.Book)
                  .WithMany(b => b.WriterBooks)
                  .HasForeignKey(wb => wb.BookId);
            HasRequired(wb => wb.Writer)
                  .WithMany(b => b.WriterBooks)
                  .HasForeignKey(wb => wb.WriterId);
        }
    }
    internal class WriterConfiguration : EntityTypeConfiguration<Writer>
    {
        public WriterConfiguration()
        {
            ToTable("Writer").HasKey(c => c.Id);
            Property(c => c.FirstName).HasMaxLength(256).IsRequired();
            Property(c => c.LastName).HasMaxLength(256).IsRequired();
            Property(c => c.DateOfBirth).IsRequired();
            Property(c => c.Biography).HasMaxLength(int.MaxValue);
            HasMany(c => c.WriterBooks);
        }
    }

}
