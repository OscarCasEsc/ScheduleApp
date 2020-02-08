import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { ToastService } from 'src/app/services/toast.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.scss']
})
export class EditAppointmentComponent implements OnInit {
  id: string;
  name: string;
  date: string;
  description: string;
  appointment: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private appointmentService: AppointmentsService,
    private toastService: ToastService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.appointment = this.route.snapshot.queryParams;
    this.initForm();

  }

  initForm() {
    this.name = this.appointment.name;
    this.date = this.dateToString(this.appointment.date);
    this.description = this.appointment.description;
    console.log(this.date);
  }

  editAppointment() {
    const editAppointment = {
      _id: this.appointment._id,
      name: this.name,
      date: this.date,
      description: this.description,
    };
    this.appointmentService.editAppointments(editAppointment).subscribe(
      res => {
        this.toastService.show(this.translateService.instant('toastMsg.successUpdateAppointment'),
        { classname: 'bg-success text-light', delay: 2500 });
        this.router.navigate(['/appointments']);
      },
      err => {
        this.toastService.show(this.translateService.instant('toastMsg.errorUpdateAppointment'),
        { classname: 'bg-danger text-light', delay: 2500 });
      }
    );

  }

  dateToString(date) {
    date = this.datePipe.transform(date, 'yyyy-MM-dd');
    return date;
  }

}
