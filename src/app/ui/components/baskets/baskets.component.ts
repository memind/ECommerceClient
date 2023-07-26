import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from 'src/app/base/base.component';
import { List_Basket_Item } from '../../../contracts/basket/list_basket_item';
import { Update_Basket_Item } from '../../../contracts/basket/update_basket_item';
import { BasketService } from '../../../services/common/models/basket.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from 'src/app/services/ui/custom-toastr.service';
import { Router } from '@angular/router';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { DialogService } from 'src/app/services/common/dialog.service';
import {
  BasketItemDeleteState,
  BasketItemRemoveDialogComponent,
} from 'src/app/dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import {
  ShoppingCompleteDialogComponent,
  ShoppingCompleteState,
} from 'src/app/dialogs/shopping-complete-dialog/shopping-complete-dialog.component';

declare var $: any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss'],
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private basketService: BasketService,
    private orderService: OrderService,
    private toastrService: CustomToastrService,
    private router: Router,
    private dialogService: DialogService
  ) {
    super(spinner);
  }
  basketItems: List_Basket_Item[];

  async ngOnInit(): Promise<void> {
    this.showSpinner(SpinnerName.BallAtom);
    this.basketItems = await this.basketService.get();
    this.hideSpinner(SpinnerName.BallAtom);
  }

  async changeQuantity(object: any) {
    this.showSpinner(SpinnerName.BallAtom);
    const basketItemId: string = object.target.attributes['id'].value;
    const quantity: number = object.target.value;
    const basketItem: Update_Basket_Item = new Update_Basket_Item();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    await this.basketService.updateQuantity(basketItem);
    this.hideSpinner(SpinnerName.BallAtom);
  }

  removeBasketItem(basketItemId: string) {
    $('#basketModal').modal('hide');

    this.dialogService.openDialog({
      componentType: BasketItemRemoveDialogComponent,
      data: BasketItemDeleteState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerName.BallAtom);
        await this.basketService.remove(basketItemId);

        var a = $('.' + basketItemId);
        $('.' + basketItemId).fadeOut(500, () =>
          this.hideSpinner(SpinnerName.BallAtom)
        );
        $('#basketModal').modal('show');
      },
    });
  }

  shoppingComplete() {
    $('#basketModal').modal('hide');

    this.dialogService.openDialog({
      componentType: ShoppingCompleteDialogComponent,
      data: ShoppingCompleteState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerName.BallAtom);
        const order: Create_Order = new Create_Order();
        order.address = 'Altındağ';
        order.description = 'Falanca filanca...';
        await this.orderService.create(order);
        this.hideSpinner(SpinnerName.BallAtom);
        this.toastrService.message(
          'Order received!',
          'Your order has been created!',
          {
            messageType: ToastrMessageType.Info,
            position: ToastrPosition.TopRight,
          }
        );
        this.router.navigate(['/']);
      },
    });
  }
}