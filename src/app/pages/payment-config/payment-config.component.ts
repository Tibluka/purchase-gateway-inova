import { Component, OnInit } from '@angular/core';
import { OrderInfoService } from 'src/app/services/order-info.service';

@Component({
  selector: 'app-payment-config',
  templateUrl: './payment-config.component.html',
  styleUrls: ['./payment-config.component.scss']
})
export class PaymentConfigComponent implements OnInit {

  constructor(public orderInfoService: OrderInfoService) { }

  ngOnInit(): void {
  }


}
