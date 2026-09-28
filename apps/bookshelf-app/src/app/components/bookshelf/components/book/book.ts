import { Component , Input } from '@angular/core';
import { RouterLink } from '@angular/router'
import { BookResponse as IBook }from '@org/booklib'

@Component({
  imports: [ RouterLink ],
  selector: 'app-book',
  styleUrl: './book.css',
  templateUrl: './book.html',
})
export class Book {
  @Input() book!: IBook; 
}
