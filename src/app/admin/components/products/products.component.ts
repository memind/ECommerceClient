import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit{
  
  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService){
    super(spinner);
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerName.Timer);

    // CREATE
    // this.httpClientService.post({controller: "product"},{
    //   name: "Kalem",
    //   stock: 100,
    //   price: 15
    // }).subscribe();

    // UPDATE
    // this.httpClientService.put({controller: "product", }, {
    //   id: "940790fe-6f0d-485c-98b2-10601811038b",
    //   name: "Renkli Kağıt",
    //   stock: 123,
    //   price: 44
    // }).subscribe();

    // DELETE
    // this.httpClientService.delete({controller: "product"}, "940790fe-6f0d-485c-98b2-10601811038a").subscribe();

    // this.httpClientService.get({
    //   baseUrl: "https://jsonplaceholder.typicode.com",
    //   controller: "posts"
    // }).subscribe(data => console.log(data));
    
  }

}
