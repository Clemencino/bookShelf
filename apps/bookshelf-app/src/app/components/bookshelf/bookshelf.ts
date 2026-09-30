import { Component} from '@angular/core';
import { RouterLink } from '@angular/router'
import { BookService } from '../../services/book';
import { BookResponse as IBook } from '@org/booklib';
import { Book }from './components/book/book';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { StoreChoose } from '../store-choose/store-choose'

@Component({
  imports: [ RouterLink , Book, StoreChoose ],
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
