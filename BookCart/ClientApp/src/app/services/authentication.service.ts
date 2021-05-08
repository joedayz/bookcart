import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {SubscriptionService} from "./subscription.service";
import {User} from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  oldUserId;

  constructor(private http: HttpClient,
              private subscriptionService: SubscriptionService) {
  }

  logout() {
    localStorage.clear();
    this.resetSubscription();
    this.setTempUserId();
  }

  login(user) {
    return this.http.post<any>('/api/login', user)
      .pipe(
        map(response =>{
          if(response && response.token){
            this.oldUserId = localStorage.getItem('userId');
            localStorage.setItem('authToken', response.token);
            this.setUserDetails();
            localStorage.setItem('userId', response.userDetails.userId);
            this.subscriptionService.cartItemcount$.next(response.carItemCount);
          }
          return response;
        })
      );
  }

  setUserDetails() {
    if(localStorage.getItem('authToken')){
      const userDetails = new User();
      const decodeUserDetails = JSON.parse(atob(localStorage.getItem('authToken').split('.')[1]));

      userDetails.userId = decodeUserDetails.userid;
      userDetails.username = decodeUserDetails.sub;
      userDetails.userTypeId = Number(decodeUserDetails.userTypeId);
      userDetails.isLoggedIn = true;
      this.subscriptionService.userData.next(userDetails);
    }
  }

  resetSubscription() {
    this.subscriptionService.userData.next(new User());
    this.subscriptionService.wishlistItem$.next([]);
    this.subscriptionService.wishlistItemcount$.next(0);
    this.subscriptionService.cartItemcount$.next(0);
  }

  private setTempUserId() {
    if(!localStorage.getItem('userId')){
      const tempUserId = this.generateTempUserId();
      localStorage.setItem('userId', tempUserId.toString());
    }
  }

  private generateTempUserId() {
    return Math.floor(Math.random() * (99999 - 11111 + 1) + 12345);
  }
}
