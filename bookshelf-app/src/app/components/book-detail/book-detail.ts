import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../../services/book';

interface Book {
  name: string;
  description: string;
  urlImage: string;
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
  allBooks: Book[] = [];

  ngOnInit() {
    const nameFromUrl = this.route.snapshot.paramMap.get('bookName');
    this.bookService.getBooks().subscribe((books) =>{
        this.allBooks = books;
    });

    for (let i = 0; i < this.allBooks.length; i++) {
      if (this.allBooks[i].name === nameFromUrl) {
        this.book = this.allBooks[i];
        this.bookIndex = i;
      }
    }
  }

  /*
  deleteThisBook() {
    this.bookService.deleteBook(this.bookIndex);
    this.router.navigate(['/']);
  }
    */
}
