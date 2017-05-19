using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WriterApp.Data.Model;

namespace WriterApp.Data.Configuration
{
    internal class WriterBookConfiguration : DbEntityConfiguration<WriterBook>
    {
        public override void Configure(EntityTypeBuilder<WriterBook> entity)
        {
            entity.ToTable("WriterBook");
            entity.HasKey(wb => new
            {
                wb.BookId,
                wb.WriterId
            });
            entity.HasOne(wb => wb.Book)
                  .WithMany(b => b.WriterBooks)
                  .HasForeignKey(wb => wb.BookId);
            entity.HasOne(wb => wb.Writer)
                  .WithMany(b => b.WriterBooks)
                  .HasForeignKey(wb => wb.WriterId);
        }
    }
}
