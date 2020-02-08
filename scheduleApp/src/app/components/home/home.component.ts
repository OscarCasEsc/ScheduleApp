import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  collapsed = true;
  constructor(
    private translateService: TranslateService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  changeLanguage(lang) {
    this.translateService.use(lang);
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }

}
