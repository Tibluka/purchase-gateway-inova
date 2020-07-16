import { Component, OnInit } from '@angular/core';

class formCardClass {
  cardNumber: number;
  cardName: string;
  cardCPF: number;
  cardCVC: number;
  cardValidityPeriod: string;
}

@Component({
  selector: 'app-installments',
  templateUrl: './installments.component.html',
  styleUrls: ['./installments.component.scss']
})
export class InstallmentsComponent implements OnInit {

  qtdCard: number = 1
  formCards: Array<formCardClass> = []

  constructor() { }

  ngOnInit(): void {
    this.formCards.push(new formCardClass())
  }

  cardQty() {
    if (this.qtdCard < this.formCards.length) {
      for (let index = 0; this.qtdCard < this.formCards.length; index++) {
        this.formCards.pop()
      }
    } else {
      for (let index = 0; this.formCards.length < this.qtdCard; index++) {
        this.formCards.push(new formCardClass())
      }
    }
  }

  selectChangeHandler(event: any) {
    this.qtdCard = event.target.value
    this.cardQty()
    console.log(this.formCards)
  }

}
