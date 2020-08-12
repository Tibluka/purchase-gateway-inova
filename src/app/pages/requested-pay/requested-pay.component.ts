import { Component, OnInit } from '@angular/core';
import { OrderInfoService } from 'src/app/services/order-info.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-requested-pay',
  templateUrl: './requested-pay.component.html',
  styleUrls: ['./requested-pay.component.scss']
})
export class RequestedPayComponent implements OnInit {

  previousUrl: string
  data = []

  constructor(public router: Router, public orderInfoService: OrderInfoService, private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.previousUrl = localStorage.getItem('previousUrl')
    this.getDate()
  }

  getDate() {
    const chave = this.previousUrl.replace('payment/', '')
    return this.apiService.getApi('gateway/obterinformacoespedido' + chave).subscribe(dateInfo => {
      this.data.push(dateInfo)
      this.orderInfoService.navBarColor = this.data[0].cor_cartorio
    })
  }

  click() {
    this.router.navigate([this.previousUrl])
  }

}
