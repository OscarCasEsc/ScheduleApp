import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmationComponent } from '../../delete-confirmation/delete-confirmation.component';

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
    private router: Router
  ) { }

  ngOnInit() {
    this.contactsService.getContacts().subscribe(
      res => {
        this.contacts = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  editContact(contact) {
    this.router.navigate(['/editContact'], {queryParams: contact, skipLocationChange: true});
  }

  deleteContact() {
    console.log('trying to open confirmation');
    const modalRef = this.modalService.open(DeleteConfirmationComponent,
      { backdrop: 'static', size: 'sm', keyboard: false, centered: true }).result.then((result) => {
        console.log(`Closed with: ${result}`);
      }, (reason) => {
        console.log(`Dismissed ${reason}`);
      });
  }

}
