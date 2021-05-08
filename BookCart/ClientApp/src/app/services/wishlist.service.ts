import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SubscriptionService} from "./subscription.service";
import {Book} from "../models/book";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  baseURL: string;

  constructor(
    private http: HttpClient, private subscriptionService: SubscriptionService){
    this.baseURL = '/api/Wishlist/';
  }

  toggleWishlistItem(userId, bookId: number) {
    return this.http.post<Book[]>( this.baseURL + `ToggleWishlist/${userId}/${bookId}`,{})
      .pipe(
        map((response: Book[]) => {
          this.setWishlist(response);
          return response;
        })
      );
  }

  private setWishlist(response: Book[]) {
    this.subscriptionService.wishlistItemcount$.next(response.length);
    this.subscriptionService.wishlistItem$.next(response);
  }
}
