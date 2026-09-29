import { Component , inject, numberAttribute} from '@angular/core';
import { Router, RouterLink } from '@angular/router'
import { FormsModule} from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core'
import { UserCreated } from '@org/userlib'
import { UserService } from '../../services/user'


@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-user-create-account',
  styleUrl: './user-create-account.css',
  templateUrl: './user-create-account.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreateComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  cdr = inject(ChangeDetectorRef);
  userService = inject(UserService);
  first_name = '';
  last_name = '';
  login = '';
  password = '';
  confirm_password = '';
  id = 0;
  isSamePassword = false;
  cancel() {
    this.router.navigate(['/userLogin']);
  }
  submit() {
    if (this.first_name.trim() === '' || this.last_name.trim() === '' || this.login.trim() === '' ||
    this.password.trim() === '' || this.confirm_password.trim() === '' || this.confirm_password !== this.password){
      return;
    }
    const user : UserCreated = {
      id : this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.login,
      password: this.password,
    };
    this.userService.createUser(user).subscribe(() =>{
      console.log('user created :'+ JSON.stringify(user));
      this.router.navigate(['/']);
    });

    // endpoint 
  }

  
  
}


/*
submit() {
    if (this.newBookName.trim() === ''){
      return;
    }
    const newBook = {
      name: this.newBookName,
      description: this.newBookDescription,
      urlImage: this.newUrlImage,
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

*/