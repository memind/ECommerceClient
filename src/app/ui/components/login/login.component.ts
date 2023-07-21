import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from '../../../base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/common/auth.service';
import { UserAuthService } from '../../../services/common/models/user-auth.service';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(private userAuthService: UserAuthService, spinner: NgxSpinnerService, private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router, private socialAuthService: SocialAuthService) {
    super(spinner);
    socialAuthService.authState.subscribe(async (user: SocialUser) => {
      console.log(user);
      this.showSpinner(SpinnerName.BallAtom);
      switch (user.provider) {
        case 'GOOGLE':
          await userAuthService.googleLogin(user, () => {
            this.authService.identityCheck();
            this.hideSpinner(SpinnerName.BallAtom);
          });
          break;
        case 'FACEBOOK':
          await userAuthService.facebookLogin(user, () => {
            this.authService.identityCheck();
            this.hideSpinner(SpinnerName.BallAtom);
          });
          break;
      }
    });
  }

  ngOnInit(): void {}

  async login(usernameOrEmail: string, password: string) {
    this.showSpinner(SpinnerName.BallAtom);
    await this.userAuthService.login(usernameOrEmail, password, () => {
      this.authService.identityCheck();

      this.activatedRoute.queryParams.subscribe((params) => {
        const returnUrl: string = params['returnUrl'];
        if (returnUrl) this.router.navigate([returnUrl]);
      });
      this.hideSpinner(SpinnerName.BallAtom);
    });
  }

  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
