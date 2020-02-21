import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-schedule-app',
  templateUrl: './schedule-app.component.html',
  styleUrls: ['./schedule-app.component.scss']
})
export class ScheduleAppComponent implements OnInit {

  constructor(
    private router: Router,
    public translateService: TranslateService
  ) { }

  ngOnInit() {
  }

  changeLanguage(lang: string) {
    localStorage.setItem('lang', lang);
    this.translateService.use(lang);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

}
