import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {NgMaterialModule} from "../ng-material/ng-material.module";
import {BookFormComponent} from "../components/admin/book-form/book-form.component";
import {ManageBooksComponent} from "../components/admin/manage-books/manage-books.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {DeleteBookComponent} from "../components/admin/delete-form/delete-book.component";


@NgModule({
  declarations: [
    BookFormComponent,
    ManageBooksComponent,
    DeleteBookComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgMaterialModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }

