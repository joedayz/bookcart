import {Component, Inject, OnInit} from "@angular/core";
import {Book} from "../../../models/book";
import {EMPTY, Observable} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BookService} from "../../../services/book.service";
import {catchError} from "rxjs/operators";


@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent implements OnInit {

  bookData$: Observable<Book>;

  constructor( public dialogRef: MatDialogRef<DeleteBookComponent>,
               @Inject(MAT_DIALOG_DATA) public bookid: number,
               private bookService: BookService) {
  }

  ngOnInit(): void {
    this.fetchBookData();
  }

  fetchBookData() {
    this.bookData$ = this.bookService.getBookById(this.bookid)
      .pipe(
        catchError(error => {
          console.log('Error ocurred while fetching book data : ', error);
          return EMPTY;
        }));
  }

  confirmDelete() {
    this.bookService.deleteBook(this.bookid).subscribe(
      () => {
      }, error => {
        console.log('Error ocurred while fetching book data : ', error);
      });
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
