import { Component, input, output, inject} from '@angular/core';
import { FormsModule} from '@angular/forms'
import { Router, RouterLink} from '@angular/router'
import { BookService } from '../../services/book'
import { ActivatedRoute } from '@angular/router'
import { ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core'

interface Book {
  id: number;
  name: string;
  description: string;
  urlImage: string,
}

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

  ngOnInit() {
    const idUrl = this.route.snapshot.paramMap.get('id');
    if (idUrl !== null) {
      this.isEdit=true;
      const id = Number(idUrl);

      this.bookService.getBook(id).subscribe((book) => {
        this.newBookName = book.name;
        this.newBookDescription = book.description;
        this.newUrlImage = book.urlImage;

        this.cdr.detectChanges();
      });
    }
}
  annuler() {
    this.router.navigate(['/']);
  }
  submit() {
    if (this.newBookName.trim() === ''){
      return;
    }
    const newBook = {
      name: this.newBookName,
      description: this.newBookDescription,
      urlImage: this.newUrlImage
    };

    const idUrl = this.route.snapshot.paramMap.get('id');
    if (idUrl === null) {
      this.bookService.createBook(newBook).subscribe((book) => {
        console.log('book created');
        this.router.navigate(['/']);
      });
    }
    else
    {
      const id = Number(idUrl);
      this.bookService.updateBook(id, newBook).subscribe(() =>{
        console.log('book updated');
        this.router.navigate(['/']);
      });
    }
  }
}