import { Component, inject} from '@angular/core';
import { FormsModule} from '@angular/forms'
import { Router} from '@angular/router'
import { BookService } from '../../services/book'
import { ActivatedRoute } from '@angular/router'
import { ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core'

@Component({
  imports: [ FormsModule ],
  standalone: true,
  selector: 'app-book-form',
  styleUrl: './book-form.css',
  templateUrl: './book-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BookFormComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  bookService = inject(BookService)
  newBookName = '';
  newBookDescription = '';
  newUrlImage = '';
  cdr = inject(ChangeDetectorRef);
  isEdit = false;
  storeId = 0;
  ngOnInit() {
    const storeIdUrl = this.route.snapshot.queryParamMap.get('storeId');
    if (storeIdUrl !== null) {
      this.storeId = Number(storeIdUrl);
    }
    const idUrl = this.route.snapshot.paramMap.get('id');

    if (idUrl !== null) {
      this.isEdit = true;

      const bookId = Number(idUrl);

      this.bookService.getBook(bookId, this.storeId).subscribe((book) => {
        this.newBookName = book.name;
        this.newBookDescription = book.description;
        console.log(this.newUrlImage);
        console.log(book.urlImage);
        this.newUrlImage = book.urlImage;
        this.cdr.detectChanges();
      });
    }
  }
  annuler() {
    this.router.navigate(['/bookshelf'], {
      queryParams: {
          storeId: this.storeId
        }
    });
  }
  submit() {
    if (this.newBookName.trim() === '') {
      return;
    }

    const newBook = {
      name: this.newBookName,
      description: this.newBookDescription,
      urlImage: this.newUrlImage,
    };

    const idUrl = this.route.snapshot.paramMap.get('id');

    if (idUrl === null) {
      this.bookService.createBook(newBook, this.storeId).subscribe((book) => {
        this.router.navigate(['/bookshelf'], {
          queryParams: {
              storeId: this.storeId
            }
        });
      });
    } else {
        const id = Number(idUrl);
        const storeId = Number(this.route.snapshot.queryParamMap.get('storeId'));
        this.bookService.updateBook(id, newBook, storeId).subscribe(() => {
          this.router.navigate(['/bookshelf'], { queryParams: {storeId: this.storeId}});
        });
    }
}
}
