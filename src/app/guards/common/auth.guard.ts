import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { _isAuthenticated } from '../../services/common/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt'
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerName } from '../../base/base.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, private router: Router, private toastrService: CustomToastrService, private spinner: NgxSpinnerService) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (!_isAuthenticated) {
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url } });
      this.toastrService.message("You have to login!", "Unauthorized Access!", {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight
      })
    }
    this.spinner.hide(SpinnerName.BallAtom);
    return true;
  }
}