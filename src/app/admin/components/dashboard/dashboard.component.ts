import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from 'src/app/base/base.component';
import { AlertifyService, MessagePosition, MessageType } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(private alertify: AlertifyService, spinner: NgxSpinnerService){
    super(spinner);
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerName.BallAtom);
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

