import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from 'src/app/services/contacts.service';
import { ToastService } from 'src/app/services/toast.service';
import { TranslateService } from '@ngx-translate/core';

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
    private contactService: ContactsService,
    private toastService: ToastService,
    private translateService: TranslateService
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
        this.toastService.show(this.translateService.instant('toastMsg.successUpdateContact'),
        { classname: 'bg-success text-light', delay: 2500 });
        this.router.navigate(['/contacts']);
      },
      err => {
        this.toastService.show(this.translateService.instant('toastMsg.errorUpdateContact'),
        { classname: 'bg-danger text-light', delay: 2500 });
      }
    );

  }

}
