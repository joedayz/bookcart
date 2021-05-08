import {Component, Input, OnInit} from "@angular/core";
import {BookService} from "../../services/book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Book} from "../../models/book";
import {EMPTY, Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {User} from "../../models/user";
import {SubscriptionService} from "../../services/subscription.service";


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit{

  BookDetails$: Observable<Book>;
  bookId;
  userData$: Observable<User>;

  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private subscriptionService: SubscriptionService) {
    this.bookId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

      this.route.params.subscribe(
        params =>{
          this.bookId = +params['id'];
          this.getBookDetails();
        }
      )

      this.userData$ = this.subscriptionService.userData;

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
