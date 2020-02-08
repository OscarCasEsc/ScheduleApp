import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast-global',
  templateUrl: './toast-global.component.html',
  styleUrls: ['./toast-global.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastGlobalComponent implements OnInit {

  constructor(
    public toastService: ToastService
  ) { }

  ngOnInit() {
  }

}
