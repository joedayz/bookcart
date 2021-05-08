import {Component, Input, OnChanges} from "@angular/core";
import {Book} from "../../models/book";
import {WishlistService} from "../../services/wishlist.service";
import {SnackbarService} from "../../services/snackbar.service";
import {SubscriptionService} from "../../services/subscription.service";


@Component({
  selector: 'app-addtowishlist',
  templateUrl: './addtowishlist.component.html',
  styleUrls: ['./addtowishlist.component.scss']
})
export class AddtowishlistComponent implements OnChanges{

  @Input()
  bookId: number;

  @Input()
  showButton = false;

  userId;
  toggle: boolean;
  buttonText: string;
  public wishlistitems : Book[];

  constructor(private wishlistService: WishlistService,
              private subscriptionService: SubscriptionService,
              private snackBarService: SnackbarService) {
    this.userId = localStorage.getItem('userId');
  }


  ngOnChanges(): void {
      this.subscriptionService.wishlistItem$.pipe().subscribe(
        (bookData) => {
          this.setFavourite(bookData);
          this.setButtonText();
        }
      );
  }

  setFavourite(bookData: Book[]) {
    const favBook = bookData.find(f => f.bookId === this.bookId);
    this.toggle = !!favBook;
  }

  toggleValue() {
    this.toggle = !this.toggle;
    this.setButtonText();

    this.wishlistService.toggleWishlistItem(this.userId, this.bookId).subscribe(
      () => {
        if (this.toggle) {
          this.snackBarService.showSnackBar('Item added to your Wishlist');
        } else {
          this.snackBarService.showSnackBar('Item removed from your Wishlist');
        }
      }, error => {
        console.log('Error ocurred while adding to wishlist: ', error);
      }
    );

  }

  setButtonText() {
    if(this.toggle){
      this.buttonText = 'Remove from Wishlist';
    }else{
      this.buttonText = 'Add to Wishlist';
    }
  }


}
