import { Routes } from '@angular/router';
import { BookshelfComponent } from './components/bookshelf/bookshelf'
import { BookFormComponent} from './components/book-form/book-form'
import { BookDetail} from './components/book-detail/book-detail'
import { UserLoginComponent } from './components/user-login/user-login';
import { UserCreateComponent } from './components/user-create-account/user-create-account';
import { StoreCreateComponent} from './components/store-create/store-create'
import { StoreChoose } from './components/store-choose/store-choose'
export const routes: Routes = [
    { path: '', component: UserLoginComponent },
    { path:'addBook', component: BookFormComponent },
    { path: 'book/:id', component: BookDetail },
    { path: 'editBook/:id', component: BookFormComponent},
    { path: 'userCreateAccount', component: UserCreateComponent},
    { path: 'bookshelf', component: BookshelfComponent},
    { path: 'storeForm', component:StoreCreateComponent },
    { path: 'test', component: StoreChoose}
];
