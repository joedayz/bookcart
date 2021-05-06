import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, shareReplay} from "rxjs/operators";
import {Categories} from "../models/categorites";
import {Book} from "../models/book";


@Injectable({providedIn: 'root'})
export class BookService {

  baseURL = '/api/book/';

  constructor(private http: HttpClient) {
  }

  categories$ = this.http.get<Categories[]>(this.baseURL + 'GetCategoriesList').pipe(shareReplay(1));
  books$ = this.getAllBooks().pipe(shareReplay(1));


  getAllBooks(){
    return this.http.get<Book[]>(this.baseURL);
  }

  getBookById(id: number) {
    return this.books$.pipe(map(book => book.find(b => b.bookId === id)));
  }
}
