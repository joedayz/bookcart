import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {SubscriptionService} from "../../services/subscription.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {takeUntil} from "rxjs/operators";
import {User} from "../../models/user";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{

  showPassword = true;
  userId;
  private unsubscribe$ = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private subscriptionService: SubscriptionService) {
  }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  get username() {
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }


  ngOnInit(): void {
    this.subscriptionService.userData.asObservable()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe( (data: User) => {
        this.userId = data.userId;
      });
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  login() {
    if(this.loginForm.valid){
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      this.authenticationService.login(this.loginForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          ()=>{
              //TODO setShoppingCart
            //TODO setWishlist
            this.router.navigate([returnUrl]);
          },
          ()=>{
            this.loginForm.reset();
            this.loginForm.setErrors({
              invalidLogin: true
            })
          }
        );
    }
  }
}
