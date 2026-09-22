import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../../services/book';

interface Book {
  name: string;
  description: string;
}

@Component({
  imports: [ RouterLink ],
  standalone: true,
  selector: 'app-book-detail',
  styleUrl: './book-detail.css',
  templateUrl: './book-detail.html',
})
export class BookDetail {
  route = inject(ActivatedRoute);
  router = inject(Router);
  bookService = inject(BookService);

  book?: Book;
  bookIndex = 0;

  ngOnInit() {
    const nameFromUrl = this.route.snapshot.paramMap.get('bookName');
    const allBooks = this.bookService.getBooks();

    for (let i = 0; i < allBooks.length; i++) {
      if (allBooks[i].name === nameFromUrl) {
        this.book = allBooks[i];
        this.bookIndex = i;
      }
    }
  }

  deleteThisBook() {
    this.bookService.deleteBook(this.bookIndex);
    this.router.navigate(['/']);
  }
}
