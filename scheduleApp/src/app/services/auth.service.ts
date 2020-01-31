import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL = 'http://localhost:3000/api/auth';

  constructor(
    private http: HttpClient
  ) { }

  login(email, password) {
    const url = this.URL + `/login?email=${email}&password=${password}`;
    return this.http.get<any>(url);
  }

  register(user) {
    return this.http.post<any>(this.URL + '/register', user);
  }
}
