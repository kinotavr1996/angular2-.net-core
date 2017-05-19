using System.Collections.Generic;

namespace WriterApp.Data.Common.Pagination
{
    public interface IPagedList<T> : IReadOnlyList<T>
    {
        int TotalCount { get; }
        int Page { get; }
        int PageSize { get; }
    }
}
