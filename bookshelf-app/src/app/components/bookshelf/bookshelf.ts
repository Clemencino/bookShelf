import { Component, inject} from '@angular/core';
import { RouterLink } from '@angular/router'
import { BookService } from '../../services/book';
import { Book }from './components/book/book';

@Component({
  imports: [ RouterLink , Book ],
  standalone: true,
  selector: 'app-bookshelf',
  styleUrl: './bookshelf.css',
  templateUrl: './bookshelf.html',
})

export class BookshelfComponent {
  bookService = inject(BookService);

  bookshelf = this.bookService.getBooks();
  
  deleteBook(idBook : number){
    this.bookService.deleteBook(idBook);
  }
}
