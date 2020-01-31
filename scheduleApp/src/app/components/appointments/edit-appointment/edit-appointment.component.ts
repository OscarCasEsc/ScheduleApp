import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppointmentsService } from 'src/app/services/appointments.service';
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
    private appointmentService: AppointmentsService
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
        console.log('Appointment edited!');
        this.router.navigate(['/appointments']);
      },
      err => {
        console.log('Error while editing!');
      }
    );

  }

  dateToString(date) {
    date = this.datePipe.transform(date, 'yyyy-MM-dd');
    return date;
  }

}
