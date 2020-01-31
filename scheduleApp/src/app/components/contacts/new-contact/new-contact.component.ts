import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit {

  name: string;
  firstSurname: string;
  secondSurname: string;
  email: string;
  address: string;
  phone: string;

  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  createContact() {
    const contact = {
      name: this.name,
      firstSurname: this.firstSurname,
      secondSurname: this.secondSurname,
      email: this.email,
      address: this.address,
      phone: this.phone
    };
    this.contactsService.createContact(contact).subscribe(
      res => {
        console.log('Contact created!');
        this.router.navigate(['/contacts']);

      },
      err => {
        console.log('Error');
      }
    );
  }

}
