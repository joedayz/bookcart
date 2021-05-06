using System.Collections.Generic;
using BookCart.Models;

namespace BookCart.Interfaces
{
    public interface IBookService
    {
        List<Book> GetAllBooks();

        List<Categories> GetCategories();
        Book GetBookData(int bookId);
    }
}