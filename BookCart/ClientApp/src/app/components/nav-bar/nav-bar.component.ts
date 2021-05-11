
import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {SubscriptionService} from "../../services/subscription.service";
import {Observable} from "rxjs";
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";
import {UserType} from "../../models/usertype";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit, OnDestroy {

  userData = new User();
  userDataSubscription: any;
  userType = UserType;
  wishListCount$: Observable<number>;
  cartItemCount$: Observable<number>;

  constructor(private router: Router,
              private authService: AuthenticationService,
              private userService: UserService,
              private subscriptionService: SubscriptionService) { }

  ngOnInit() {
    this.userDataSubscription = this.subscriptionService.userData.asObservable().subscribe(data=>{
      this.userData = data;
    });

    this.cartItemCount$ = this.subscriptionService.cartItemcount$;
    this.wishListCount$ = this.subscriptionService.wishlistItemcount$;

  }

  ngOnDestroy(): void {
    if(this.userDataSubscription){
      this.userDataSubscription.unsubscribe();
    }
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
