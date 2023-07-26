import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from '../../../base/base.component';
import { AlertifyOptions, AlertifyService, MessageType, MessagePosition } from '../../../services/admin/alertify.service';
import { UserAuthService } from '../../../services/common/models/user-auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent extends BaseComponent {

  constructor(spinner: NgxSpinnerService, private userAuthService: UserAuthService, private alertifyService: AlertifyService) {
    super(spinner)
  }

  passwordReset(email: string) {
    this.showSpinner(SpinnerName.BallAtom)
    this.userAuthService.passwordReset(email, () => {
      this.hideSpinner(SpinnerName.BallAtom)
      this.alertifyService.message("Mail sended successfuly!", {
        messageType: MessageType.Notify,
        position: MessagePosition.TopRight
      });
    })
  }
}