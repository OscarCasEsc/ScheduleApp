import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  URL = 'http://localhost:3000/api/contacts/';

  constructor(
    private http: HttpClient
  ) { }

  getContacts(page, pageSize) {
    return this.http.get<any>(this.URL + `getContacts/${page}/${pageSize}`);
  }

  createContact(contact) {
    return this.http.post<any>(this.URL + 'addContact', contact);
  }

  editContact(contact) {
    return this.http.post<any>(this.URL + `editContact/${contact._id}`, contact);
  }

  deleteContact(contact) {
    return this.http.delete<any>(this.URL + `deleteContact/${contact._id}`);
  }
}
