import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: string;
  firstSurname: String;
  secondSurname: String;
  email: String;
  password: String;
  password2: String;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  submit() {
    const user = {
      name: this.name,
      firstSurname: this.firstSurname,
      secondSurname: this.secondSurname,
      email: this.email,
      password: this.password
    };
    this.authService.register(user).subscribe(
      res => {
        this.router.navigate(['']);

      },
      err => {

      }
    );
  }

}
