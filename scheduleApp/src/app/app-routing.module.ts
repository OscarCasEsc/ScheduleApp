import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ContactsComponent } from './components/contacts/contacts/contacts.component';
import { NewContactComponent } from './components/contacts/new-contact/new-contact.component';
import { AppointmentsComponent } from './components/appointments/appointments/appointments.component';
import { ScheduleAppComponent } from './components/schedule-app/schedule-app.component';
import { NewAppointmentComponent } from './components/appointments/new-appointment/new-appointment.component';
import { EditContactComponent } from './components/contacts/edit-contact/edit-contact.component';
import { EditAppointmentComponent } from './components/appointments/edit-appointment/edit-appointment.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: ScheduleAppComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'contacts', component: ContactsComponent},
      { path: 'newContact', component: NewContactComponent},
      { path: 'editContact', component: EditContactComponent},
      { path: 'appointments', component: AppointmentsComponent},
      { path: 'newAppointment', component: NewAppointmentComponent},
      { path: 'editAppointment', component: EditAppointmentComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
