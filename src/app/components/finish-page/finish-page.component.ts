import { Component, OnInit } from '@angular/core';
import { OrderInfoService } from 'src/app/services/order-info.service';

@Component({
  selector: 'app-finish-page',
  templateUrl: './finish-page.component.html',
  styleUrls: ['./finish-page.component.scss']
})
export class FinishPageComponent implements OnInit {

  certo = false
  errado = false

  constructor(public orderInfoService: OrderInfoService) { }

  ngOnInit(): void {
    this.purchaseFinalized()
  }

  purchaseFinalized() {
    this.certo = !this.orderInfoService.compraFinalizada
  }

  failedToComplete(){
    this.errado = !this.orderInfoService.compraNaoFinalizada
  }

}
