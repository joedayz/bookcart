import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {NavBarComponent} from "./components/nav-bar/nav-bar.component";
import {NgMaterialModule} from './ng-material/ng-material.module';
import {HomeComponent} from "./components/home/home.component";
import {BookFilterComponent} from "./components/book-filter/book-filter.component";
import {BookCardComponent} from "./components/book-card/book-card.component";
import {BookDetailsComponent} from "./components/book-details/book-details.component";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    BookFilterComponent,
    BookCardComponent,
    BookDetailsComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
