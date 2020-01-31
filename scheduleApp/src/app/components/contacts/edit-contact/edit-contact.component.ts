import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  name: string;
  firstSurname: string;
  secondSurname: string;
  email: string;
  address: string;
  phone: string;

  contact: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactsService
  ) { }

  ngOnInit() {
    this.contact = this.route.snapshot.queryParams;
    this.initForm();
  }

  initForm() {
    this.name = this.contact.name;
    this.firstSurname = this.contact.firstSurname;
    this.secondSurname = this.contact.secondSurname;
    this.email = this.contact.email;
    this.address = this.contact.address;
    this.phone = this.contact.phone;

  }

  editContact() {
    const editContact = {
      _id: this.contact._id,
      name: this.name,
      firstSurname: this.firstSurname,
      secondSurname: this.secondSurname,
      email: this.email,
      address: this.address,
      phone: this.phone
    };
    this.contactService.editContact(editContact).subscribe(
      res => {
        console.log('Contact edited!');
        this.router.navigate(['/contacts']);
      },
      err => {
        console.log('Error while editing!');
      }
    );

  }

}
