import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { OrderInfoService } from 'src/app/services/order-info.service';
import { NgForm } from '@angular/forms';


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
export class InstallmentsComponent implements OnInit, AfterViewInit {

  /* @Input() count = 0 */

  @ViewChild('formInstallments', { read: NgForm }) formValid: any //permite visualizar o html e o formulario dentro dele com o id especificado.

  showCardsInfo = true
  qtdCard: number = 1
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @Output() asideInstallments = new EventEmitter()

  formCards: Array<formCardClass> = []

  cartItems = []

  idDoComprador = 'c3160b67-8b4e-498f-8824-b79b47ace6e2'
  options = []

  constructor(private apiService: ApiService,
    public orderInfoService: OrderInfoService,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.formCards.push(new formCardClass())
    this.formCards[0].accordionOpen = true
    this.asideInstallments.emit(1)
    this.getCartInfo()
  }

  //ngAfterViewInit só aparece quando renderizar HTML na tela. Essa é a diferença entre ele e o ngOnInit
  //só da pra usar o ViewChild com ele
  ngAfterViewInit() {
    setTimeout(() => {
      this.orderInfoService.disableButton = this.formValid
    }, 1);
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
