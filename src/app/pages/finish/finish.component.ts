import { Component, OnInit } from '@angular/core';
import { OrderInfoService } from 'src/app/services/order-info.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {

  previousUrl: string
  data = []

  constructor(public orderInfoService: OrderInfoService, public apiService: ApiService) {

  }

  ngOnInit(): void {
    this.previousUrl = localStorage.getItem('previousUrl')
    this.getDate()
  }

  getDate() {
    const chave = this.previousUrl.replace('payment/', '')
    this.apiService.getApi('obterinformacoespedido?chave=' + chave).subscribe(cartorio => {
      this.data.push(cartorio)
      this.orderInfoService.navBarColor = this.data[0].cor_cartorio
      console.log(this.data[0].cor_cartorio)
    })
  }

}
