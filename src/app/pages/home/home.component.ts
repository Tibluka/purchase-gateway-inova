import { Component, OnInit } from '@angular/core';
import { OrderInfoService } from 'src/app/services/order-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  paymentMethod: string;
  methods: string[] = ['Cartão de crédito', 'Boleto'];
  
  constructor(public orderInfoService: OrderInfoService) { }

  ngOnInit(): void {
  }

}
