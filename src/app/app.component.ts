import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';

declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ECommerceClient';
  @ViewChild(DynamicLoadComponentDirective, { static: true })
  dynamicLoadComponentDirective: DynamicLoadComponentDirective;

  constructor(public authService: AuthService, private toastrService: CustomToastrService, private router: Router, private dynamicLoadComponentService: DynamicLoadComponentService) { }

  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("You are logged out!", "Logged Out", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    });
  }
  loadComponent() {
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent, this.dynamicLoadComponentDirective.viewContainerRef);
  }
}
