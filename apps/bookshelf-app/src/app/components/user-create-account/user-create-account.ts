import { Component , inject} from '@angular/core';
import { Router  } from '@angular/router'
import { FormsModule} from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core'
import { UserCreated } from '@org/userlib'
import { UserService } from '../../services/user'
@Component({
  imports: [FormsModule],
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
  isSamePassword = true;
  cancel() {
    this.router.navigate(['/userLogin']);
  }
  async submit() {
    if (this.first_name.trim() === '' || this.last_name.trim() === '' || this.login.trim() === ''){
      return;
    }
    if (this.password!== '' && this.confirm_password!=='' && this.password === this.confirm_password) {
      this.isSamePassword = true;
      const user : UserCreated = {
        id : this.id,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.login,
        password: this.password
      };
      this.userService.createUser(user).subscribe(() =>{
        console.log('user created :'+ JSON.stringify(user));
        this.router.navigate(['/']);
      });
    }
    else{
      this.isSamePassword = false;
    }
    
  }  
  
}

