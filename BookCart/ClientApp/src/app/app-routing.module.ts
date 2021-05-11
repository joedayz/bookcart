import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {HomeComponent} from "./components/home/home.component";
import {BookDetailsComponent} from "./components/book-details/book-details.component";
import {LoginComponent} from "./components/login/login.component";
import {ShoppingcartComponent} from "./components/shoppingcart/shoppingcart.component";
import {AdminAuthGuard} from "./guards/admin-auth.guard";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";



const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'books/details/:id', component: BookDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'shopping-cart', component: ShoppingcartComponent },
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
    RouterModule.forRoot(appRoutes),
  ],

  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
