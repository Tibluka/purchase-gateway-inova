import { Component, OnInit } from '@angular/core';
import { OrderInfoService } from 'src/app/services/order-info.service';

@Component({
  selector: 'app-requested-pay',
  templateUrl: './requested-pay.component.html',
  styleUrls: ['./requested-pay.component.scss']
})
export class RequestedPayComponent implements OnInit {

  constructor(public orderInfoService: OrderInfoService) { }

  ngOnInit(): void {
  }

}
