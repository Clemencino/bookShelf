import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router'
import { FormsModule} from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core'
import { UserToLog } from '@org/userlib'
import { UserService } from '../../services/user'
import { AuthService } from '../../services/auth';

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
  authService = inject(AuthService);
  login = '';
  password = '';
  isCorrect = true;
  cancel() {
    this.router.navigate(['/']);
  } 
  getUserToLog(): UserToLog {
    const user : UserToLog = {
      email: this.login,
      password: this.password,
    };
    return user;
  }
  submit() {
    const user = this.getUserToLog();
    this.userService.checkLoginUser(user).subscribe({
        next:(response: any) =>{
          this.authService.setAccessToken(response.token);
          this.authService.userName.set(response.name);
          this.router.navigate(['/bookshelf']);
        },
        error: (error) => {
          alert(error.error.message);
          this.isCorrect = false;
        }
    });
  }
  

}
