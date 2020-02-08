import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { TranslateService } from '@ngx-translate/core';

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
    private router: Router,
    private toastService: ToastService,
    private translateService: TranslateService
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
        this.toastService.show(this.translateService.instant('toastMsg.successCreateContact'),
        { classname: 'bg-success text-light', delay: 2500 });
        this.router.navigate(['/contacts']);

      },
      err => {
        this.toastService.show(this.translateService.instant('toastMsg.errorCreateContact'),
        { classname: 'bg-danger text-light', delay: 2500 });
      }
    );
  }

}
