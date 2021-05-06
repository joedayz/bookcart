import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {HomeComponent} from "./components/home/home.component";
import {BookDetailsComponent} from "./components/book-details/book-details.component";



const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'books/details/:id', component: BookDetailsComponent }
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
