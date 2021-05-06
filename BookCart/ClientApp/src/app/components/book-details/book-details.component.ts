import {Component, Input, OnInit} from "@angular/core";
import {BookService} from "../../services/book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Book} from "../../models/book";
import {EMPTY, Observable} from "rxjs";
import {catchError} from "rxjs/operators";


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit{

  BookDetails$: Observable<Book>;
  bookId;

  constructor(private bookService: BookService, private route: ActivatedRoute) {
    this.bookId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

      this.route.params.subscribe(
        params =>{
          this.bookId = +params['id'];
          this.getBookDetails();
        }
      )


  }


  getBookDetails() {
    this.BookDetails$ = this.bookService.getBookById(this.bookId).pipe(
      catchError(error => {
        console.log('Error fetching book data: ', error);
        return EMPTY;
      })
    );
  }
}
