import { Component, OnInit } from '@angular/core';
import { OrderInfoService } from 'src/app/services/order-info.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  idDoComprador = ''

  constructor(public orderInfoService: OrderInfoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const idDoComprador = this.activatedRoute.snapshot.paramMap.get("id")
    this.idDoComprador = idDoComprador
    this.orderInfoService.getInfo(idDoComprador)
  }

  proceed() {
    this.orderInfoService.progressNavBarInit = true
    if (this.orderInfoService.paymentMethod === 'Cartão de crédito') {
      this.router.navigate(['/payment/' + this.idDoComprador])
      this.orderInfoService.isCreditCard = true
    } else {
    /*   alert('FUNCIONALIDADE EM DESENVOLVIMENTO...')
      this.orderInfoService.progressNavBarInit = false */
      this.orderInfoService.isCreditCard = false
      this.orderInfoService.getSenderHash()
    }
  }

}
