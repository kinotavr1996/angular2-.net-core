namespace WriterApp.Data.Model
{
    public class WriterBook
    {
        public int BookId { get; set; }
        public virtual Book Book { get; set; }
        public int WriterId { get; set; }
        public virtual Writer Writer { get; set; }
    }
}
