import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  URL = 'http://localhost:3000/api/appointments/';

  constructor(
    private http: HttpClient
  ) { }

  getAppointments() {
    return this.http.get<any>(this.URL + 'getAppointments');
  }

  createAppointment(appointment) {
    return this.http.post<any>(this.URL + 'addAppointment', appointment);
  }

  deleteAppointment(id) {
    return this.http.delete<any>(this.URL + 'deleteAppointment' + `/${id}`);
  }
  editAppointments(appointment) {
    return this.http.post<any>(this.URL + `editAppointment/${appointment._id}`, appointment);
  }
}
