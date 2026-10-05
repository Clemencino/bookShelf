import { Component, inject} from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router'
import { BookService } from '../../services/book';
import { BookResponse as IBook } from '@org/booklib';
import { Book }from './components/book/book';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { StoreChoose } from '../store-choose/store-choose'
import { AuthService } from '../../services/auth';

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
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor(private bookService: BookService, private cdr: ChangeDetectorRef) {}
  
  ngOnInit() {
  this.route.queryParams.subscribe((params) => {
    const storeId = Number(params['storeId']);
    if (!storeId){
      return;
    }
    this.bookService.getBooks(storeId).subscribe((books) => {
      this.bookshelf = books;
      this.cdr.detectChanges();
    });

  });

}
logout() {
  this.authService.logout().subscribe(() => {
    this.router.navigate(['/']);
  });
}
}
