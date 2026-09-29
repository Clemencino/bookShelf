import { Component , inject, numberAttribute} from '@angular/core';
import { Router, RouterLink } from '@angular/router'
import { FormsModule} from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core'
import { UserCreated } from '@org/userlib'



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
  first_name = '';
  last_name = '';
  login = '';
  password = '';
  confirm_password = '';
  id = 0;
  cancel() {
    this.router.navigate(['/userLogin']);
  }
  submit() {
      const user : UserCreated = {
        id : this.id,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.login,
        password: this.password,
      };
    this.router.navigate(['/userCreateAccount']);
    console.log(user);
    // endpoint 
  }
  
}
