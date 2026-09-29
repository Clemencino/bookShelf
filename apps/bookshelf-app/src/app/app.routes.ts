import { Routes } from '@angular/router';
import { BookshelfComponent } from './components/bookshelf/bookshelf'
import { BookFormComponent} from './components/book-form/book-form'
import { BookDetail} from './components/book-detail/book-detail'
import { UserLoginComponent } from './components/user-login/user-login';
import { UserCreateComponent } from './components/user-create-account/user-create-account';
export const routes: Routes = [
    {path: '',component: BookshelfComponent },
    {path:'addBook', component: BookFormComponent },
    { path: 'book/:id', component: BookDetail },
    { path: 'editBook/:id', component: BookFormComponent},
    { path: 'userLogin', component: UserLoginComponent },
    { path: 'userCreateAccount', component: UserCreateComponent}
];
