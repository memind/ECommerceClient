import { NgxSpinnerService } from "ngx-spinner";

export class BaseComponent {
  constructor(private spinner: NgxSpinnerService){}

  showSpinner(spinnerName: SpinnerName){
    this.spinner.show(spinnerName);

    setTimeout(() => this.hideSpinner(spinnerName), 1000)
  }

  hideSpinner(spinnerName: SpinnerName){
    this.spinner.hide(spinnerName);
  }
}

export enum SpinnerName {
  BallAtom = "s1",
  Timer = "s2",
  LineSpinClockwiseFadeRotating = "s3"
}