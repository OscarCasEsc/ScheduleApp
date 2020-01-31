import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logIn() {

    this.authService.login(this.email, this.password).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/contacts']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
