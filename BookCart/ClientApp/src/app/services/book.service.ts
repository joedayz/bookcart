import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";


@Injectable({providedIn: 'root'})
export class BookService {

  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = "/api/book/";
  }

  getAllBooks(){
    return this.http.get(this.baseURL).pipe(
      map(response => {
        return response;
      })
    )
  }

  getCategories() {
    return this.http.get(this.baseURL + "GetCategoriesList").pipe(
      map(response=>{
        return response;
      })
    );
  }
}
