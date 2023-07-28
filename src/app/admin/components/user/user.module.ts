import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { UserComponent } from './user.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    ListComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule
  ]
})
export class UserModule { }
