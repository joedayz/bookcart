using System;
using System.Collections.Generic;
using System.Linq;
using BookCart.Dto;
using BookCart.Interfaces;
using BookCart.Models;
using Microsoft.EntityFrameworkCore;

namespace BookCart.DataAccess
{
    public class BookDataAccessLayer: IBookService
    {
        private readonly BookDBContext _dbContext;

        public BookDataAccessLayer(BookDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public List<Book> GetAllBooks()
        {
            try
            {
                return _dbContext.Book.AsNoTracking().ToList();
            }
            catch
            {
                throw;
            }
        }

        public List<Categories> GetCategories()
        {
            List<Categories> lstCategories = new List<Categories>();
            lstCategories = (from CategoriesList in _dbContext.Categories select CategoriesList).ToList();
            return lstCategories;
        }

        public Book GetBookData(int bookId)
        {
            try
            {
                Book book = _dbContext.Book.FirstOrDefault(x => x.BookId == bookId);
                if (book != null)
                {
                    _dbContext.Entry(book).State = EntityState.Detached;
                    return book;
                }
                return null;
            }
            catch
            {
                throw;
            }
        }

        public List<Book> GetSimilarBooks(int bookId)
        {
            List<Book> lstBook = new List<Book>();
            Book book = GetBookData(bookId);

            lstBook = _dbContext.Book.Where(x => x.Category == book.Category && x.BookId != book.BookId)
                .OrderBy(u => Guid.NewGuid())
                .Take(5)
                .ToList();
            return lstBook;
        }

        public List<CartItemDto> GetBooksAvailableInCart(string cartid)
        {
            try
            {
                List<CartItemDto> cartItemList = new List<CartItemDto>();
                List<CartItems> cartItems = _dbContext.CartItems.Where(x => x.CartId == cartid).ToList();

                foreach (CartItems item in cartItems)
                {
                    Book book = GetBookData(item.ProductId);
                    CartItemDto objCartItem = new CartItemDto
                    {
                        Book = book,
                        Quantity = item.Quantity
                    };
                    cartItemList.Add(objCartItem);
                }

                return cartItemList;
            }
            catch 
            {
                throw;
            }
        }
    }
}