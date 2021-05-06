import {Component, Input, OnInit} from "@angular/core";
import {BookService} from "../../services/book.service";
import {Book} from "../../models/book";


@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {

  @Input('book')
  book: Book;

  isActive = false;



}
