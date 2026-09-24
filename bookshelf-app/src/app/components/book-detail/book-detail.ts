import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../../services/book';
import { ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

interface Book {
  id: number;
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
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BookDetail {
  route = inject(ActivatedRoute);
  router = inject(Router);
  bookService = inject(BookService);
  cdr = inject(ChangeDetectorRef);
  book?: Book;

  ngOnInit() {
    const idUrl =this.route.snapshot.paramMap.get('id');

    if (idUrl !== null) {
      const id = Number(idUrl);
      this.bookService.getBook(id).subscribe((book) => {
        this.book = book;
        this.cdr.detectChanges();
      });
    }
  }

  /*
  deleteThisBook() {
    this.bookService.deleteBook(this.bookIndex);
    this.router.navigate(['/']);
  }
    */
}
