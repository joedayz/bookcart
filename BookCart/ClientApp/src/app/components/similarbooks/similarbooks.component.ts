import {Component, Input, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {Book} from "../../models/book";
import {BookService} from "../../services/book.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-similarbooks',
  templateUrl: './similarbooks.component.html',
  styleUrls: ['./similarbooks.component.scss']
})
export class SimilarbooksComponent implements OnInit{

  @Input()
  bookId: number;

  SimilarBook$: Observable<Book[]>;

  constructor(private bookService: BookService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params=>{
        this.bookId = +params.id;
        this.getSimilarBookData();
      }
    )
  }

  getSimilarBookData() {
    this.SimilarBook$ = this.bookService.getSimilarBooks(this.bookId);
  }
}
