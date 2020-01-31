import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmationComponent } from '../../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  appointments: any;

  constructor(
    private appointmentsService: AppointmentsService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.appointmentsService.getAppointments().subscribe(
      res => {
        this.appointments = res;

      },
      err => {
        console.log(err);
      }
    );

  }

  editAppointment(appointment) {
    console.log(appointment);
    this.router.navigate(['editAppointment'], { queryParams: appointment, skipLocationChange: true});
  }

  deleteAppointment() {
    console.log('trying to open confirmation');
    const modalRef = this.modalService.open(DeleteConfirmationComponent,
      { backdrop: 'static', size: 'sm', keyboard: false, centered: true });
    modalRef.componentInstance.action = 'delete-appointment';
    modalRef.result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${reason}`);
    });
  }
}
