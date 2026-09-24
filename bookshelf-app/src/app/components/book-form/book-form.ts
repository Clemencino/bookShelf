import { Component, input, output, inject} from '@angular/core';
import { FormsModule} from '@angular/forms'
import { Router, RouterLink} from '@angular/router'
import { BookService } from '../../services/book'

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
})

export class BookFormComponent {
  router = inject(Router);
  bookService = inject(BookService)
  newBookName = '';
  newBookDescription = '';
  newUrlImage = '';

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
    this.bookService.createBook(newBook).subscribe((book) => {
      console.log('book created');
      this.router.navigate(['/']);
    });

  }
}