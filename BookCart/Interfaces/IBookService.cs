using System.Collections.Generic;
using BookCart.Dto;
using BookCart.Models;

namespace BookCart.Interfaces
{
    public interface IBookService
    {
        List<Book> GetAllBooks();

        List<Categories> GetCategories();
        Book GetBookData(int bookId);
        List<Book> GetSimilarBooks(int bookId);
        List<CartItemDto> GetBooksAvailableInCart(string cartid);
    }
}