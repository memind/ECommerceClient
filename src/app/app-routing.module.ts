import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { CustomerComponent } from './admin/components/customer/customer.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './ui/components/home/home.component';
import { ProductsComponent } from './ui/components/products/products.component';

const routes: Routes = [
  { path: "admin", component: LayoutComponent, children: [
    {path: "", component: DashboardComponent},
    { path: "customers", loadChildren : () => import("./admin/components/customer/customer.module").then(module => module.CustomerModule)},
    { path: "orders", loadChildren : () => import("./admin/components/order/order.module").then(module => module.OrderModule)},
    { path: "products", loadChildren : () => import("./admin/components/products/products.module").then(module => module.ProductsModule)}
  ]},
  {path:"", component: HomeComponent},
  { path:"products", loadChildren : () => import("./ui/components/products/products.module").then(module => module.ProductsModule)},
  { path:"basket", loadChildren : () => import("./ui/components/baskets/baskets.module").then(module => module.BasketsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }