import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerModule } from './customer/customer.module';
import { ProductsModule } from './products/products.module';
import { DashboardModule } from './dashboard/dashboard.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomerModule,
    ProductsModule,
    DashboardModule
  ]
})
export class ComponentsModule { }
