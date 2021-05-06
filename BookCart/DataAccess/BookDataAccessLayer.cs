using System.Collections.Generic;
using System.Linq;
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
    }
}