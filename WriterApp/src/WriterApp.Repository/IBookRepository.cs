using WriterApp.Data.Model;

namespace WriterApp.Repository
{
    public interface IBookRepository:IRepository<Book>
    {
        Book GetById(int id);
    }
}
