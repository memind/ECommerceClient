import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CustomToastrService {
  constructor(private toastr: ToastrService){}
    message(message: string, title: string, option: Partial<ToastrOptions>){
      this.toastr[option.messageType](message, title,{positionClass: option.position})
    }
}

export class ToastrOptions {
  messageType: ToastrMessageType;
  position: ToastrPosition;
}

export enum ToastrPosition{
    TopRight = "toast-top-right",
    TopLeft = "toast-top-left",
    TopCenter = "toast-top-center",
    TopFullWidth = "toast-top-full-width",
    BottomRight = "toast-bottom-right",
    BottomLeft = "toast-bottom-left",
    BottomCenter = "toast-bottom-center",
    BottomFullWidth = "toast-bottom-full-width"
}

export enum ToastrMessageType{
  Success = "success",
  Info = "info",
  Error = "error",
  Warning = "warning"
}
