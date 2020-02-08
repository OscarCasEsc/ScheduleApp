import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss']
})
export class NewAppointmentComponent implements OnInit {

  name: string;
  date: Date;
  description: string;

  constructor(
    private appointmentService: AppointmentsService,
    private router: Router,
    private toastService: ToastService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {

  }

  createAppointment() {
    const appointment = {
      name: this.name,
      date: this.date,
      description: this.description
    };
    this.appointmentService.createAppointment(appointment).subscribe(
      res => {
        this.toastService.show(this.translateService.instant('toastMsg.successCreateAppoitment'),
        { classname: 'bg-success text-light', delay: 2500 });
        this.router.navigate(['/appointments']);

      },
      err => {
        this.toastService.show(this.translateService.instant('toastMsg.errorCreateAppointment'),
        { classname: 'bg-danger text-light', delay: 2500 });
      }
    );
  }

}
