using System.Collections.Generic;
using System.Threading.Tasks;
using BookCart.Dto;
using BookCart.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookCart.Controllers
{
    [Route("api/[controller]")]
    public class ShoppingCartController: Controller 
    {
        readonly ICartService _cartService;
        readonly IBookService _bookService;

        public ShoppingCartController(ICartService cartService, IBookService bookService)
        {
            _cartService = cartService;
            _bookService = bookService;
        }
        
        [Authorize]
        [HttpGet]
        [Route("SetShoppingCart/{oldUserId}/{newUserId}")]
        public int Get(int oldUserId, int newUserId)
        {
            _cartService.MergeCart(oldUserId, newUserId);
            return _cartService.GetCartItemCount(newUserId);
        }
        
        [HttpGet("{userId}")]
        public async Task<List<CartItemDto>> Get(int userId)
        {
            string cartid = _cartService.GetCartId(userId);
            return await Task.FromResult(_bookService.GetBooksAvailableInCart(cartid)).ConfigureAwait(true) ;
        }
        
        [HttpPost]
        [Route("AddToCart/{userId}/{bookId}")]
        public int Post(int userId, int bookId)
        {
            _cartService.AddBookToCart(userId, bookId);
            return _cartService.GetCartItemCount(userId);
        }
        
        [HttpPut("{userId}/{bookId}")]
        public int Put(int userId, int bookId)
        {
            _cartService.DeleteOneCartItem(userId, bookId);
            return _cartService.GetCartItemCount(userId);
        }
        
        [HttpDelete("{userId}/{bookId}")]
        public int Delete(int userId, int bookId)
        {
            _cartService.RemoveCartItem(userId, bookId);
            return _cartService.GetCartItemCount(userId);
        }
        
        [HttpDelete("{userId}")]
        public int Delete(int userId)
        {
            return _cartService.ClearCart(userId);
        }
    }
}