import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AppointmentsComponent } from './components/appointments/appointments/appointments.component';
import { NewAppointmentComponent } from './components/appointments/new-appointment/new-appointment.component';
import { ContactsComponent } from './components/contacts/contacts/contacts.component';
import { NewContactComponent } from './components/contacts/new-contact/new-contact.component';
import { ScheduleAppComponent } from './components/schedule-app/schedule-app.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { EditContactComponent } from './components/contacts/edit-contact/edit-contact.component';
import { EditAppointmentComponent } from './components/appointments/edit-appointment/edit-appointment.component';
import { DatePipe } from '@angular/common';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastGlobalComponent } from './components/toast-global/toast-global.component';

export function HttpLoaderFactory(http: HttpClient ) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AppointmentsComponent,
    NewAppointmentComponent,
    ContactsComponent,
    NewContactComponent,
    ScheduleAppComponent,
    EditContactComponent,
    EditAppointmentComponent,
    DeleteConfirmationComponent,
    ToastGlobalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgbModule
  ],
  entryComponents: [
    DeleteConfirmationComponent
  ],
  providers: [ DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
