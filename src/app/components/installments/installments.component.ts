import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { OrderInfoService } from 'src/app/services/order-info.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


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

  qtdCard: number = 1
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @Output() asideInstallments = new EventEmitter()
  formCards: Array<formCardClass> = []
  cartItems = []
  options = []

  constructor(private apiService: ApiService,
    public orderInfoService: OrderInfoService,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    const idDoComprador = this.activatedRoute.snapshot.paramMap.get("id")
    this.formCards.push(new formCardClass())
    this.asideInstallments.emit(1)
    this.getCartInfo(idDoComprador)
  }

  //ngAfterViewInit só aparece quando renderizar HTML na tela. Essa é a diferença entre ele e o ngOnInit
  //só da pra usar o ViewChild com ele
  ngAfterViewInit() {
    setTimeout(() => {
      this.orderInfoService.disableButton = this.formValid
    }, 1);
  }

  async getCartInfo(idDoComprador) {
    const cartorio = await this.orderInfoService.getInfo(idDoComprador)
    this.cartItems.push(cartorio)
    const installments = this.orderInfoService.obterInformacoesPedido.qtd_max_parcelamento
    for (let index = 1; index <= installments; index++) {
      this.options.push(index + 'x')
    }
  }

  setInstallments(cardInstallments) {
    this.orderInfoService.disableAfterFinish = true
    this.orderInfoService.installments = cardInstallments
    const parcela = cardInstallments.replace('x', '')
    this.orderInfoService.createCardToken(parcela)
    console.log(parcela)
  }

}
