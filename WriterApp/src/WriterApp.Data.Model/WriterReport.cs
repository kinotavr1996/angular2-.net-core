namespace WriterApp.Data.Model
{
    public class WriterReport
    {
        public string FullName { get; set; }
        public int NumberOfBooks { get; set; }
        public int? FirstBook { get; set; }
        public int? LastBook { get; set; }
    }
}
