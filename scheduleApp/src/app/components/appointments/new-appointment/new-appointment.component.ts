import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { Router } from '@angular/router';

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
    private router: Router
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
        console.log('Appointment Created');
        this.router.navigate(['/appointments']);

      },
      err => {
        console.log('Error al crear');
      }
    );
  }

}
