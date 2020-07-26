import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { OrderInfoService } from 'src/app/services/order-info.service';



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
  

  panelOpenState = true
  showCardsInfo = true
  moreThanOneCard = false
  notMoreThanOneCard = true
  qtdCard: number = 1
  fillCardsInfo = 'Mastercard **** 8300'
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @Output() asideInstallments = new EventEmitter()



  formCards: Array<formCardClass> = []

  cartItems = []

  idDoComprador = '6d124e85-160f-4e6b-a0f5-252d9fa87f5a'
  options = []

  constructor(private apiService: ApiService, public orderInfoService: OrderInfoService, private _snackBar: MatSnackBar) {

  }


  ngOnInit(): void {
    this.formCards.push(new formCardClass())
    this.formCards[0].accordionOpen = true
    this.asideInstallments.emit(1)
    this.getCartInfo()
    this.setInstallments(1)
  }

  getCartInfo() {
    this.apiService.getApi<obterInformacoesPedido>('gateway/obterinformacoespedido/' + this.idDoComprador).subscribe(cartorio => {
      this.cartItems.push(cartorio)
      const installments = 8
      for (let index = 1; index <= installments; index++) {
        this.options.push(index + 'x')
      }
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
  }

  setInstallments(cardInstallments) {
    this.asideInstallments.emit(cardInstallments)
    console.log(this.formCards)
  }

  isMoreThanOneCard() {
    this.moreThanOneCard = !this.moreThanOneCard
    this.showCardsInfo = !this.showCardsInfo
  }

  isNotMoreThanOneCard() {
    this.notMoreThanOneCard = !this.notMoreThanOneCard
    this.showCardsInfo = !this.showCardsInfo
  }

  openSnackBar() {
    if (this.orderInfoService.compraFinalizada) {
      this._snackBar.open('Eba!! Deu tudo certo', 'Fechar', {
        duration: 10000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } else {
      this._snackBar.open('OOPS!! Algo deu errado', 'Fechar', {
        duration: 10000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

}
