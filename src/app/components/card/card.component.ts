import { Component, OnInit } from '@angular/core';
import { OrderInfoService } from 'src/app/services/order-info.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  flipped = false

  constructor(public orderInfoService: OrderInfoService) {
  }
  ngOnInit(): void {
  }

  flip(){
    this.flipped = !this.flipped
  }
}
