import { Injectable, NgZone } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
declare let PagSeguroDirectPayment: any;
declare var success: any
declare var error: any
declare var expirationDateSplit: any


class obterInformacoesPedido {
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

class cardData {
  cardBin: string;
  cardNumber: string;
  cvv: string;
  userFullName: string;
  userCPF: string;
  cardValidityPeriod: string;
  installments: number;
  brand: {
    name: string;
    bin: string;
    cvvSize: string;
    expirable: boolean;
    validationAlgorithm: string;
  }
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderInfoService {

  idDoComprador = ''
  obterInformacoesPedido: obterInformacoesPedido = new obterInformacoesPedido()
  cardData: cardData = new cardData()
  disableButton //recebe um verdadeiro ou falso para habilitar ou desabilitar o botão finalizar do componente aside
  compraFinalizada = true
  installments: number
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 0;
  bufferValue = 75;
  progressBarInit = false
  cardBrandImage = ''


  constructor(private apiService: ApiService, private router: Router, private ngZone: NgZone) {
  }

  async getInfo(chavePedido) {

    if (this.obterInformacoesPedido.nome_cartorio != '' && this.idDoComprador !== chavePedido) {
      this.idDoComprador = chavePedido
      this.obterInformacoesPedido = await this.apiService.getApi<any>('gateway/obterinformacoespedido/' + this.idDoComprador).toPromise()
      PagSeguroDirectPayment.setSessionId(this.obterInformacoesPedido.pagseguro_session);
    }
  }

  getBrand() {
    if (this.cardData.cardNumber.length == 6) {
      PagSeguroDirectPayment.getBrand({
        cardBin: this.cardData.cardNumber,
        success: (response) => {
          this.cardData.brand = response.brand
          this.cardBrandImage = response.brand.name
        },
        error: (response) => {
          //tratamento do erro
        },
        complete: (response) => {
          //tratamento comum para todas chamadas
        }
      });
    }
  }

  createCardToken() {
    this.progressBarInit = true
    this.mode = 'indeterminate';
    let expirationMonth = this.cardData.cardValidityPeriod.substring(0, 2)
    let expirationYear = this.cardData.cardValidityPeriod.substring(2, 6)
    PagSeguroDirectPayment.createCardToken({
      cardNumber: this.cardData.cardNumber, // Número do cartão de crédito
      brand: this.cardData.brand.name, // Bandeira do cartão
      cvv: this.cardData.cvv, // CVV do cartão
      expirationMonth: expirationMonth, // Mês da expiração do cartão
      expirationYear: expirationYear, // Ano da expiração do cartão, é necessário os 4 dígitos.
      success: (response) => {
        // Retorna o cartão tokenizado.
        this.getSenderHash()
        setTimeout(() => {
          this.ngZone.run(() => this.router.navigate(['/finish']))
        }, 3000);
      },
      error: (response) => {
        // Callback para chamadas que falharam.
        this.mode = 'determinate';
        alert('Ocorreu um erro ao processar as informações digitadas')
        console.log(response)

      },
      complete: (response) => {
        // Callback para todas chamadas.
        console.log(response)
      }
    });
  }

  getSenderHash(){
    PagSeguroDirectPayment.onSenderHashReady(function(response){
      if(response.status == 'error') {
          console.log(response.message);
          return false;
      }
      var hash = response.senderHash;
      console.log(hash) //Hash estará disponível nesta variável.
  });
  }
}