import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  cardsReview = 7

 constructor() { }

  ngOnInit(): void {
  }

  /* setInstallments(installments) {
    this.cardsReview = installments
  }
 */
}
