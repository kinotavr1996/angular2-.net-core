using System;
using System.Collections.Generic;

namespace WriterApp.Data.Model
{
    public class Writer
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Biography { get; set; }
        public virtual ICollection<WriterBook> WriterBooks { get; set; }
    }
}
