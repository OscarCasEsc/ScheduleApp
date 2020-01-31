import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {

  closeResult: string;
  @Input() public action;

  bodyText: string;

  constructor(
    public activeModal: NgbActiveModal,
    public translateService: TranslateService
  ) { }

  ngOnInit() {
    this.customModal(this.action);

  }

  customModal(deleteType) {

    if (deleteType === 'delete-appointment') {
      this.bodyText = this.translateService.instant('deleteModal.deleteAppointment');
    } else {
      this.bodyText = this.translateService.instant('deleteModal.deleteContact');
    }
  }

}
