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
  cardInstallments: number = null;
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
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @Output() asideInstallments = new EventEmitter()

  formCards: Array<formCardClass> = []

  cartItems = []

  idDoComprador = 'e5c0881d-4a40-49b3-841c-d374adfb463f'
  options = []

  constructor(private apiService: ApiService, public orderInfoService: OrderInfoService, private _snackBar: MatSnackBar) {

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
    })
  }
  
  removeCard(index) {
    console.log(index)
    if (this.qtdCard > 1) {
      this.formCards.splice(index, 1)
      this.qtdCard--
    }
  }

  setInstallments(cardInstallments) {
    this.orderInfoService.installments = cardInstallments
    console.log(cardInstallments)
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
