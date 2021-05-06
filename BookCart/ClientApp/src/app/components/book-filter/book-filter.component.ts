import {Component, Input, OnInit} from "@angular/core";
import {BookService} from "../../services/book.service";
import {EMPTY, Observable} from "rxjs";
import {Categories} from "../../models/categorites";
import {catchError} from "rxjs/operators";


@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.scss']
})
export class BookFilterComponent implements OnInit{

  @Input('category')
  category;

  categories$: Observable<Categories[]>;

  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    this.fetchCategories();
  }


  fetchCategories() {
    this.categories$ = this.bookService.categories$.pipe(
      catchError(error=>{
        console.log('Error fetching catgegory list: ', error);
        return EMPTY;
      })
    );
  }
}
