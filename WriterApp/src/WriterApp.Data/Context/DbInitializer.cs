using Microsoft.EntityFrameworkCore;

namespace WriterApp.Data.Context
{
    public static class DbInitializer
    {
        public static void Initialize(WriterContext context)
        {
            context.Database.Migrate();
        }
    }
}
