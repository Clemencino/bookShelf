import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../../services/book';
import { ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Book, BookResponse } from '@org/booklib'

@Component({
  imports: [ RouterLink ],
  standalone: true,
  selector: 'app-book-detail',
  styleUrl: './book-detail.css',
  templateUrl: './book-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BookDetail {
  route = inject(ActivatedRoute);
  router = inject(Router);
  bookService = inject(BookService);
  cdr = inject(ChangeDetectorRef);
  book?: BookResponse;
  storeId = 0;
  ngOnInit() {
    const storeIdUrl = this.route.snapshot.queryParamMap.get('storeId');
    console.log("THIS IS THE STORE ID", storeIdUrl);
    if(storeIdUrl !== null){
      this.storeId = Number(storeIdUrl);
    }
    const idUrl = this.route.snapshot.paramMap.get('id');
    if (idUrl !== null) {
      const bookId = Number(idUrl);
      const storeId = Number(storeIdUrl);
      this.bookService.getBook(bookId, storeId).subscribe((book) => {
        this.book = book;
        this.cdr.detectChanges();
      });
    }
  }

  deleteBook(){
    if (this.book) {
      const storeId = this.route.snapshot.queryParamMap.get('storeId');
      if (storeId !== null ){
        this.storeId = Number(storeId);
      }
      this.bookService.deleteBook(this.book.id, this.storeId).subscribe(() => {
      this.router.navigate(['/bookshelf'], { queryParams: {storeId: this.storeId}});
    });
    }
  }


}
