import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'purchase-gateway-inova';
  
/*   teste = 0

  somar(d){
    this.teste = this.teste + 1
    console.log(d)
  } */

  cardsReview = 0

  setInstallments(installments){
    this.cardsReview = installments
  }

 /*  somar(){
    this.cardsReview.emit('2')
  } */
  
}
