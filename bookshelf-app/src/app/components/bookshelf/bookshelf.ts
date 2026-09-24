import { Component, inject} from '@angular/core';
import { RouterLink } from '@angular/router'
import { BookService } from '../../services/book';
import { Book as IBook } from '../../models/book';
import { Book }from './components/book/book';
import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'

@Component({
  imports: [ RouterLink , Book, JsonPipe ],
  standalone: true,
  selector: 'app-bookshelf',
  styleUrl: './bookshelf.css',
  templateUrl: './bookshelf.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BookshelfComponent {
  bookshelf: IBook[] = [];

  constructor(private bookService: BookService, private cdr: ChangeDetectorRef) {}
  
  ngOnInit() {
    this.bookService.getBooks().subscribe((books) =>{
      this.bookshelf = books;
      this.cdr.detectChanges();
    });
  }
  
  /*
  deleteBook(idBook : number){
    this.bookService.deleteBook(idBook);
  }
  */
}
