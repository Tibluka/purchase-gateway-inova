import { Component, OnInit } from '@angular/core';
import { OrderInfoService } from 'src/app/services/order-info.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-requested-pay',
  templateUrl: './requested-pay.component.html',
  styleUrls: ['./requested-pay.component.scss']
})
export class RequestedPayComponent implements OnInit {

  previousUrl: string

  constructor(public router: Router, public orderInfoService: OrderInfoService) {    
  }

  ngOnInit(): void {
    this.previousUrl = localStorage.getItem('previousUrl')
  }

  click(){
    this.router.navigate([this.previousUrl])
  }

}
