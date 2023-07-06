import { Injectable } from '@angular/core';
declare var alertify : any

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  constructor() { }

  // message(message: string, messageType: MessageType, delay: number = 3, position: MessagePosition = MessagePosition.BottomRight, dismissOthers: boolean = false)
  message(message: string, options: Partial<AlertifyOptions>)
  {
    alertify.set('notifier', 'position', options.position);
    alertify.set('notifier', 'delay', options.delay);
    const msg = alertify[options.messageType](message, options.position)
    if(options.dismissOthers)
    msg.dismissOthers();
  }

  dismiss(){
    alertify.dismissAll();
  }
}

export enum MessageType {
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}

export enum MessagePosition {
  TopRight = "top-right",
  BottomRight = "bottom-right",
  TopCenter = "top-center",
  BottomCenter = "bottom-center",
  TopLeft = "top-left",
  BottomLeft = "bottom-left"
}

export class AlertifyOptions {
  messageType: MessageType = MessageType.Message;
  position: MessagePosition = MessagePosition.BottomRight;
  delay: number = 3;
  dismissOthers: boolean = false;
}
