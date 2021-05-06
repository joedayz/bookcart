import {Component, Input, OnInit} from "@angular/core";
import {BookService} from "../../services/book.service";


@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.scss']
})
export class BookFilterComponent implements OnInit{

  @Input('category')
  category;

  categoryList: [];

  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    this.bookService.getCategories().subscribe(
      (categoryData: []) =>{
        this.categoryList = categoryData;
      }, error => {
        console.log('Error fetching category list: ', error);
      }
    );
  }


}
