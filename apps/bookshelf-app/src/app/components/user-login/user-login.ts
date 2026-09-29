import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router'
import { FormsModule} from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core'
import { UserToLog } from '@org/userlib'
import { UserService } from '../../services/user'

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-user-login',
  styleUrl: './user-login.css',
  templateUrl: './user-login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserLoginComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  cdr = inject(ChangeDetectorRef);
  userService = inject(UserService);
  login = '';
  password = '';
  isCorrect = true;
  cancel() {
    this.router.navigate(['/']);
  } 
  submit() {
    if (this.login.trim() === '' || this.password.trim() === ''){
      return;
    }
    const user : UserToLog = {
      email: this.login,
      password: this.password,
    };
    this.userService.checkLoginUser(user).subscribe((response) => {
      if (response !== null) {
        console.log('Connected');
        console.log(response);
        this.router.navigate(['/']);
      }
      else{
        console.log('password or login incorrect');
        this.isCorrect = false;
        this.cdr.detectChanges();
      }

    });
  }
  

}
