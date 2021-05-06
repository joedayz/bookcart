using System.Collections.Generic;
using System.Threading.Tasks;
using BookCart.Interfaces;
using BookCart.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookCart.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class BookController: Controller
    {
        private readonly IBookService _bookService;

        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        [Route("GetCategoriesList")]
        public async Task<IEnumerable<Categories>> CategoryDetails()
        {
            return await Task.FromResult(_bookService.GetCategories());
        }
        
        
        public async Task<List<Book>> Get()
        {
            return await Task.FromResult(_bookService.GetAllBooks());
        }
    }
}