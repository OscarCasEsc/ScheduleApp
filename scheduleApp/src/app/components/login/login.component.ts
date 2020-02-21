import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showSpinner: boolean;
  wrongUserPassword: boolean;
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.wrongUserPassword = false;
    this.showSpinner = false;
    this.email = '';
  }

  logIn() {
    this.showSpinner = true;
    this.authService.login(this.email, this.password).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        console.log('login ' + this.translateService.currentLang);
        this.router.navigate(['/contacts']);
      },
      error => {
        console.log(error);
        this.showSpinner = false;
        this.wrongUserPassword = true;
      }
    );
  }

}
