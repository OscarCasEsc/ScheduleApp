import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmationComponent } from '../../delete-confirmation/delete-confirmation.component';
import { ToastService } from 'src/app/services/toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contacts: any;

  constructor(
    private contactsService: ContactsService,
    private modalService: NgbModal,
    private router: Router,
    private toastService: ToastService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.contactsService.getContacts().subscribe(
      res => {
        this.contacts = res;
      },
      err => {
        this.toastService.show(this.translateService.instant('toastMsg.errorGetContacts'),
        { classname: 'bg-danger text-light', delay: 2500 });
      }
    );
  }

  editContact(contact) {
    this.router.navigate(['/editContact'], {queryParams: contact, skipLocationChange: true});
  }

  deleteContact(contact) {
    console.log('trying to open confirmation');
    const modalRef = this.modalService.open(DeleteConfirmationComponent,
      { backdrop: 'static', size: 'sm', keyboard: false, centered: true }).result.then((result) => {
        console.log(`Closed with: ${result}`);
        if (result === 'Yes click') {
          this.delContact(contact);
        }
      }, (reason) => {
        console.log(`Dismissed ${reason}`);
      });
  }

  delContact(contact) {
    this.contactsService.deleteContact(contact).subscribe(
      res => {
        console.log('Contact deleted successfully');
        this.toastService.show(this.translateService.instant('toastMsg.successDeleteContact'),
        { classname: 'bg-success text-light', delay: 2500 });
        this.getContacts();
      },
      err => {
        console.log('Error while deleting contact');
        this.toastService.show(this.translateService.instant('toastMsg.errorDeleteContact'),
        { classname: 'bg-danger text-light', delay: 2500 });
      }
    );
  }

}
