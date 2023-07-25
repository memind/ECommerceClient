import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { AlertifyService, MessagePosition, MessageType } from 'src/app/services/admin/alertify.service';
import { HubUrls } from '../../../constants/hub-urls';
import { ReceiveFunctions } from '../../../constants/receive-functions';
import { SignalRService } from '../../../services/common/signalr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(private alertify: AlertifyService, spinner: NgxSpinnerService, private signalRService: SignalRService) {
    super(spinner)
    // signalRService.start(HubUrls.OrderHub)
    // signalRService.start(HubUrls.ProductHub)
  }
  ngOnInit(): void {
    this.signalRService.on(HubUrls.ProductHub, ReceiveFunctions.ProductAddedMessageReceiveFunction, message => {
      this.alertify.message(message, {
        messageType: MessageType.Notify,
        position: MessagePosition.TopRight
      })
    });
    this.signalRService.on(HubUrls.OrderHub, ReceiveFunctions.OrderAddedMessageReceiveFunction, message => {
      this.alertify.message(message, {
        messageType: MessageType.Notify,
        position: MessagePosition.TopCenter
      })
    });
  }
  
  m(){
    this.alertify.message("Merhaba", {
      messageType: MessageType.Success,
      delay: 5,
      position: MessagePosition.TopRight
    });
  }
  
  d(){
    this.alertify.dismiss();
  }
}

