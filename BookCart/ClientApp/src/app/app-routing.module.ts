import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {HomeComponent} from "./components/home/home.component";
import {BookDetailsComponent} from "./components/book-details/book-details.component";
import {LoginComponent} from "./components/login/login.component";
import {ShoppingcartComponent} from "./components/shoppingcart/shoppingcart.component";
import {AdminAuthGuard} from "./guards/admin-auth.guard";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {AuthGuard} from "./guards/auth.guard";
import {MyOrdersComponent} from "./components/my-orders/my-orders.component";
import {UserRegistrationComponent} from "./components/user-registration/user-registration.component";
import {WishlistComponent} from "./components/wishlist/wishlist.component";



const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'filter', component: HomeComponent },
  { path: 'search', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'books/details/:id', component: BookDetailsComponent },
  { path: 'shopping-cart', component: ShoppingcartComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'myorders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
  {
    path: 'admin/books',
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
    canLoad: [AdminAuthGuard],
    canActivate: [AdminAuthGuard]
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' }),
  ],

  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
