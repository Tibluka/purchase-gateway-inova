import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

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

interface obterInformacoesPedido {
  pagseguro_session: string;
  nome_cartorio: string;
  logo_url: string;
  cor_cartorio: string;
  documento: {
    tipo: string;
    valor: string;
  };
  items: [{
    descricao: string;
    qtd: number;
    valor_unitario: number;
  }];
  qtd_max_parcelamento: number;
  permite_multi_cartao: boolean;
  valor_total_pedido: number;
  url_callback: string;
  chave: string;
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

  cartItems = []

  idDoComprador = 'c479593e-b208-45d0-b153-90e2f1c49f54'
  options = []

  constructor(private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.formCards.push(new formCardClass())
    this.formCards[0].accordionOpen = true
    this.asideInstallments.emit(1)
    this.getCartInfo()
  }

  getCartInfo() {
    this.apiService.getApi<obterInformacoesPedido>('gateway/obterinformacoespedido/' + this.idDoComprador).subscribe(cartorio => {
      this.cartItems.push(cartorio)
      const installments = cartorio.qtd_max_parcelamento
      
      for (let index = 1; index <= installments; index++) {
        this.options.push(index + 'x')
      }
      console.log(cartorio)
      console.log(this.options)
    })
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
