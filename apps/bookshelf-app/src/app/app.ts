import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookshelfComponent } from './components/bookshelf/bookshelf';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
}
