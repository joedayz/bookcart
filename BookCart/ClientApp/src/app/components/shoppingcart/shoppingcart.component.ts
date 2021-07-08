import {Component, OnDestroy, OnInit} from "@angular/core";
import {ShoppingCart} from "../../models/shoppingcart";
import {Subject} from "rxjs";
import {CartService} from "../../services/cart.service";
import {SnackbarService} from "../../services/snackbar.service";
import {SubscriptionService} from "../../services/subscription.service";
import {takeUntil} from "rxjs/operators";


@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit, OnDestroy {

  public cartItems: ShoppingCart[];
  userId;
  totalPrice: number;
  private unsubscribe$ = new Subject<void>();
  isLoading: boolean;

  constructor(private cartService: CartService,
              private snackBarService: SnackbarService,
              private subscriptionService: SubscriptionService) {
    this.userId = localStorage.getItem('userId');
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.cartItems = [];
    this.isLoading = true;
    this.getShoppingCartItems();
  }

  getShoppingCartItems() {
    this.cartService.getCartItems(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: ShoppingCart[]) => {
          this.cartItems = result;
          this.getTotalPrice();
          this.isLoading = false;
        }, error => {
          console.log('Error ocurred while fetching shopping cart item : ', error);
        });
  }

  getTotalPrice() {
    this.totalPrice = 0;
    this.cartItems.forEach(item => {
      this.totalPrice += (item.book.price * item.quantity);
    });
  }

  deleteCartItem(bookId: number) {
    this.cartService.removeCartItems(this.userId, bookId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        result => {
          this.subscriptionService.cartItemcount$.next(result);
          this.snackBarService.showSnackBar('Product removed from cart');
          this.getShoppingCartItems();
        }, error => {
          console.log('Error ocurred while deleting cart item : ', error);
        });
  }

  addToCart(bookId: number) {
    this.cartService.addBookToCart(this.userId, bookId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        result => {
          this.subscriptionService.cartItemcount$.next(result);
          this.snackBarService.showSnackBar('One item added to cart');
          this.getShoppingCartItems();
        }, error => {
          console.log('Error ocurred while addToCart data : ', error);
        });
  }
  deleteOneCartItem(bookId: number) {
    this.cartService.deleteOneCartItem(this.userId, bookId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        result => {
          this.subscriptionService.cartItemcount$.next(result);
          this.snackBarService.showSnackBar('One item removed from cart');
          this.getShoppingCartItems();
        }, error => {
          console.log('Error ocurred while fetching book data : ', error);
        });
  }
  clearCart() {
    this.cartService.clearCart(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        result => {
          this.subscriptionService.cartItemcount$.next(result);
          this.snackBarService.showSnackBar('Cart cleared!!!');
          this.getShoppingCartItems();
        }, error => {
          console.log('Error ocurred while deleting cart item : ', error);
        });
  }



}