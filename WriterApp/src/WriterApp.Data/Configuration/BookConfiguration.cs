using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WriterApp.Data.Model;

namespace WriterApp.Data.Configuration
{
    internal class BookConfiguration : DbEntityConfiguration<Book>
    {
        public override void Configure(EntityTypeBuilder<Book> entity)
        {
            entity.ToTable("Book");
            entity.HasKey(c => c.Id);
            entity.Property(c => c.Caption).HasMaxLength(256).IsRequired();
            entity.Property(c => c.PublishedDate).IsRequired();
            entity.HasMany(c => c.WriterBooks);
        }

    }
}
