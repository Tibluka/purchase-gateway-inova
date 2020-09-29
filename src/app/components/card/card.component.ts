import { Component, OnInit } from '@angular/core';
import { OrderInfoService } from 'src/app/services/order-info.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor(public orderInfoService: OrderInfoService) {
  }
  ngOnInit(): void {
    document.querySelector('.preload').classList.remove('preload');
    document.querySelector('.creditcard').addEventListener('click', function () {
      if (this.classList.contains('flipped')) {
        this.classList.remove('flipped');
      } else {
        this.classList.add('flipped');
      }
    })
  }



}
