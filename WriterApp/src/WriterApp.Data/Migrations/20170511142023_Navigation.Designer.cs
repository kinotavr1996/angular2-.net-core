using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using WriterApp.Data.Context;

namespace WriterApp.Data.Migrations
{
    [DbContext(typeof(WriterContext))]
    [Migration("20170511142023_Navigation")]
    partial class Navigation
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WriterApp.Data.Model.Book", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Caption")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<DateTime>("PublishedDate");

                    b.HasKey("Id");

                    b.ToTable("Book");
                });

            modelBuilder.Entity("WriterApp.Data.Model.Writer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Biography")
                        .HasMaxLength(2147483647);

                    b.Property<DateTime>("DateOfBirth");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.ToTable("Writer");
                });

            modelBuilder.Entity("WriterApp.Data.Model.WriterBook", b =>
                {
                    b.Property<int>("BookId");

                    b.Property<int>("WriterId");

                    b.HasKey("BookId", "WriterId");

                    b.HasIndex("WriterId");

                    b.ToTable("WriterBook");
                });

            modelBuilder.Entity("WriterApp.Data.Model.WriterBook", b =>
                {
                    b.HasOne("WriterApp.Data.Model.Book", "Book")
                        .WithMany("WriterBooks")
                        .HasForeignKey("BookId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("WriterApp.Data.Model.Writer", "Writer")
                        .WithMany("WriterBooks")
                        .HasForeignKey("WriterId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
