import { Routes } from '@angular/router';
import { BookshelfComponent } from './components/bookshelf/bookshelf'
import { BookFormComponent} from './components/book-form/book-form'
import { BookDetail} from './components/book-detail/book-detail'

export const routes: Routes = [
    {path: '',component: BookshelfComponent },
    {path:'addBook', component: BookFormComponent },
    { path: 'book/:id', component: BookDetail }
];
