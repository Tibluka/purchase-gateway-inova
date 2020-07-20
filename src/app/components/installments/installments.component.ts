import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

class formCardClass {
  cardNumber: number;
  cardName: string;
  cardCPF: number;
  cardCVV: number;
  cardValidityPeriod: string;
  cardInstallments: number = 1;
  cardPayValue: number;
}

@Component({
  selector: 'app-installments',
  templateUrl: './installments.component.html',
  styleUrls: ['./installments.component.scss']
})
export class InstallmentsComponent implements OnInit {

  /* @Input() count = 0 */
  showCardsInfo = false
  moreThanOneCard = false
  notMoreThanOneCard = false
  qtdCard: number = 5
  fillCardsInfo = 'Inserir os dados do seu cartão'

  @Output() asideInstallments = new EventEmitter()

  formCards: Array<formCardClass> = []

  constructor() { }

  ngOnInit(): void {
    this.formCards.push(new formCardClass())
    this.asideInstallments.emit(1)
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

  setInstallments(cardInstallments) {
    this.asideInstallments.emit(cardInstallments)
  }

  isMoreThanOneCard(){
    this.moreThanOneCard = !this.moreThanOneCard
    this.showCardsInfo = !this.showCardsInfo
  }

  isNotMoreThanOneCard(){
    this.notMoreThanOneCard = !this.notMoreThanOneCard
    this.showCardsInfo = !this.showCardsInfo
  }

}
