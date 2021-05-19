import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {NavBarComponent} from "./components/nav-bar/nav-bar.component";
import {NgMaterialModule} from './ng-material/ng-material.module';
import {HomeComponent} from "./components/home/home.component";
import {BookFilterComponent} from "./components/book-filter/book-filter.component";
import {BookCardComponent} from "./components/book-card/book-card.component";
import {BookDetailsComponent} from "./components/book-details/book-details.component";
import {SimilarbooksComponent} from "./components/similarbooks/similarbooks.component";
import {AddtowishlistComponent} from "./components/addtowishlist/addtowishlist.component";
import {LoginComponent} from "./components/login/login.component";
import {AddtocartComponent} from "./components/addtocart/addtocart.component";
import {ShoppingcartComponent} from "./components/shoppingcart/shoppingcart.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {HttpInterceptorService} from "./interceptors/http-interceptor-service";
import {ErrorInterceptorService} from "./interceptors/error-interceptor-service";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {MyOrdersComponent} from "./components/my-orders/my-orders.component";
import {UserRegistrationComponent} from "./components/user-registration/user-registration.component";
import {WishlistComponent} from "./components/wishlist/wishlist.component";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    BookFilterComponent,
    BookCardComponent,
    BookDetailsComponent,
    SimilarbooksComponent,
    AddtowishlistComponent,
    LoginComponent,
    AddtocartComponent,
    ShoppingcartComponent,
    PageNotFoundComponent,
    CheckoutComponent,
    MyOrdersComponent,
    UserRegistrationComponent,
    WishlistComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgMaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
