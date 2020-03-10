import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmationComponent } from '../../delete-confirmation/delete-confirmation.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastService } from 'src/app/services/toast.service';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  appointments: any;

  page: number;
  totalPages: number;
  pageSize: number;
  constructor(
    private appointmentsService: AppointmentsService,
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.page = 1;
    this.pageSize = 2;
    this.getAppointments(this.page, this.pageSize);
  }

  getAppointments(page, pageSize) {
    this.appointmentsService.getAppointments(page, pageSize).subscribe(
      res => {
        this.appointments = res.paginatedResult;
        this.totalPages = res.total;
      },  err => {
        this.toastService.show(this.translateService.instant('toastMsg.errorGetAppointments'),
        { classname: 'bg-danger text-light', delay: 2000 });
      }
    );
  }

  editAppointment(appointment) {
    console.log(appointment);
    this.router.navigate(['editAppointment'], { queryParams: appointment, skipLocationChange: true});
  }

  deleteAppointment(appointment) {
    console.log('trying to open confirmation');
    const modalRef = this.modalService.open(DeleteConfirmationComponent,
      { backdrop: 'static', size: 'sm', keyboard: false, centered: true });
    modalRef.componentInstance.action = 'delete-appointment';
    modalRef.result.then((result) => {
      console.log(`Closed with: ${result}`);
      if (result === 'Yes click') {
        this.delAppointment(appointment);
      }
    }, (reason) => {
      console.log(`Dismissed ${reason}`);
    });
  }

  delAppointment(appointment) {
    this.appointmentsService.deleteAppointment(appointment._id).subscribe(
      res => {
        console.log('Success while deleting Appointment');
        this.toastService.show(this.translateService.instant('toastMsg.successDeleteAppointment'),
        { classname: 'bg-success text-light', delay: 2500 });
        this.getAppointments(this.page, this.totalPages);
      },
      err => {
        console.log('Error while deleting Appointment');
        this.toastService.show(this.translateService.instant('toastMsg.errorDeleteAppointment'),
        { classname: 'bg-danger text-light', delay: 2500 });
      }
    );
  }

  pulsed(page) {
    console.log(page);
    this.getAppointments(page, this.pageSize);
  }
}


