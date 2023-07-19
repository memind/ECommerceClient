import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/products/create_product';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit{
  
  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService){
    super(spinner);
  }
  ngOnInit(): void { }
  @ViewChild(ListComponent) listComponents : ListComponent;
  createdProduct(createProduct: Create_Product){
    this.listComponents.getProducts();
  };
}
