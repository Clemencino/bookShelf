import { Component , Input } from '@angular/core';
import { Book as IBook } from '../../../../services/book';
import { RouterLink } from '@angular/router'

@Component({
  imports: [ RouterLink ],
  selector: 'app-book',
  styleUrl: './book.css',
  templateUrl: './book.html',
})
export class Book {
  @Input({}) book: IBook = {name: "", description:"", urlImage:""}; 
}
