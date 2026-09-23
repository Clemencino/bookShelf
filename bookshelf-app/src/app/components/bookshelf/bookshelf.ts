import { Component, inject} from '@angular/core';
import { RouterLink } from '@angular/router'
import { BookService } from '../../services/book';
import { Book as IBook } from '../../services/book';
import { Book }from './components/book/book';

@Component({
  imports: [ RouterLink , Book ],
  standalone: true,
  selector: 'app-bookshelf',
  styleUrl: './bookshelf.css',
  templateUrl: './bookshelf.html',
})

export class BookshelfComponent {
  bookshelf: IBook[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe((books) =>{
      console.log(books);
      this.bookshelf = books;
      console.log(this.bookshelf);
    });
  }
  /*
  deleteBook(idBook : number){
    this.bookService.deleteBook(idBook);
  }
  */
}
