import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

class formCardClass {
  cardNumber: number;
  cardName: string;
  cardCPF: number;
  cardCVV: number;
  cardValidityPeriod: string;
  cardInstallments: number = 1;
  cardPayValue: number;
  accordionOpen: boolean;
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
  qtdCard: number = 1
  fillCardsInfo = 'Mastercard **** 8300'

  @Output() asideInstallments = new EventEmitter()

  formCards: Array<formCardClass> = []

  constructor() { }

  ngOnInit(): void {
    this.formCards.push(new formCardClass())
    this.formCards[0].accordionOpen = true
    this.asideInstallments.emit(1)
  }

  cardQty() {
    this.qtdCard++
    for (let index = 0; this.formCards.length < this.qtdCard; index++) {
      this.formCards.push(new formCardClass())
    }
    this.formCards.forEach((card, index) => {
      card.accordionOpen = index === this.formCards.length - 1 ? true : false
    })

  }

  removeCard(index) {
    console.log(index)
    if (this.qtdCard > 1) {
      this.formCards.splice(index, 1)
      this.qtdCard--
    }
  }

  selectChangeHandler(event: any) {
    this.formCards = event.target.value
    console.log(this.formCards)
  }

  setInstallments(cardInstallments) {
    this.asideInstallments.emit(cardInstallments)
  }

  isMoreThanOneCard() {
    this.moreThanOneCard = !this.moreThanOneCard
    this.showCardsInfo = !this.showCardsInfo
  }

  isNotMoreThanOneCard() {
    this.notMoreThanOneCard = !this.notMoreThanOneCard
    this.showCardsInfo = !this.showCardsInfo
  }

}
