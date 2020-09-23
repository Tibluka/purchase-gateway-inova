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
  chave = ''
  data = []

  constructor(public router: Router, public orderInfoService: OrderInfoService, private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.previousUrl = localStorage.getItem('previousUrl')
    this.findIndex()
    this.getDate()
  }

  getDate() {
    if (this.findIndex()){
      this.chave = this.previousUrl.replace('/home/', '')
    }else{
      this.chave = this.previousUrl.replace('/payment/', '')
    }
    return this.apiService.getApi('obterinformacoespedido?chave=' + this.chave).subscribe(dateInfo => {
      this.data.push(dateInfo)
      this.orderInfoService.navBarColor = this.data[0].cor_cartorio
      this.orderInfoService.progressNavBarInit = false
    })
  }

  findIndex() {
    const str = this.previousUrl
    const index = str.indexOf('home')
    if (index === 1) {
      return true
    }else{
      return false
    }
  }

  click() {
    this.router.navigate([this.previousUrl])
  }

}
