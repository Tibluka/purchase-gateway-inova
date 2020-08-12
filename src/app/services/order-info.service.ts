import { Injectable, NgZone } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
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
  cardValidityPeriod: string = '';
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

  today = Date()
  dateIsValid = true
  idDoComprador = ''
  obterInformacoesPedido: obterInformacoesPedido = new obterInformacoesPedido()
  cardData: cardData = new cardData()
  disableButton //recebe um verdadeiro ou falso para habilitar ou desabilitar o botão finalizar do componente aside
  disableAfterFinish = false
  dataHoraPagamento = ''
  installments: number
  SpinColor: ThemePalette = 'warn';
  SpinMode: ProgressSpinnerMode = 'indeterminate';
  SpinValue = 50;

  navBarColor = 'rgb(218, 218, 218)'
  buttonColor = 'none'

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 0;
  bufferValue = 75;
  progressBarInit = false
  progressSpinnerInit = false
  cardBrandImage = ''
  errors = {
    invalid_card: false,
    error: false
  }


  constructor(private apiService: ApiService, private router: Router, private ngZone: NgZone) {

  }

  setSessionID() {
    PagSeguroDirectPayment.setSessionId(this.obterInformacoesPedido.pagseguro_session);
  }

  async getInfo(chavePedido) {
    if (this.obterInformacoesPedido.nome_cartorio != '' && this.idDoComprador !== chavePedido) {
      this.idDoComprador = chavePedido
      this.obterInformacoesPedido = await this.apiService.getApi<any>('gateway/obterinformacoespedido/' + this.idDoComprador).toPromise()
      this.setSessionID()
      return this.obterInformacoesPedido
    }

    return this.obterInformacoesPedido
  }

  getBrand() {
    if (this.cardData.cardNumber.length == 6) {
      PagSeguroDirectPayment.getBrand({
        cardBin: this.cardData.cardNumber,
        success: (response) => {
          this.errors.invalid_card = false
          this.cardData.brand = response.brand
          this.cardBrandImage = response.brand.name
        },
        error: (response) => {
          //tratamento do erro
          this.errors.invalid_card = true
        },
        complete: (response) => {
          //tratamento comum para todas chamadas
        }
      });
    }
  }

  validate() {
    if (this.cardData.cardValidityPeriod.length == 6) {
      var mes = this.cardData.cardValidityPeriod.substring(0, 2)
      var ano = this.cardData.cardValidityPeriod.substring(2, 6)
      this.today = new Date().toLocaleDateString().slice(3, 10).replace('/', '')
      const compareMonth = this.today.substring(0, 2)
      const compareYear = this.today.substring(2, 6)
      if ((parseInt(mes) < parseInt(compareMonth) &&
        parseInt(ano) <= parseInt(compareYear)) || 
        parseInt(ano) < parseInt(compareYear) || parseInt(ano) > 2099) {
        this.dateIsValid = false
        this.errors.error
        return false;
      } else {
        this.dateIsValid = true
        return true;
      }
    }
  }

  createCardToken(parcela, teste) {
    const dadosCartao = {
      ...this.cardData,
      brand: this.cardData.brand.name,
      expirationMonth: this.cardData.cardValidityPeriod.substring(0, 2),
      expirationYear: this.cardData.cardValidityPeriod.substring(2, 6)
    }
    PagSeguroDirectPayment.createCardToken({
      ...dadosCartao,
      success: (response) => {
        // Retorna o cartão tokenizado.
        this.disableAfterFinish = false
        this.SpinMode = 'indeterminate'
        this.progressSpinnerInit = false
        this.cardData.token = response.card.token
        this.calculateInstallments(parcela, response.card.token, dadosCartao)

      },
      error: (response) => {
        // Callback para chamadas que falharam.
        this.progressSpinnerInit = false
        this.mode = 'determinate';
        this.errors.error = true
        this.disableAfterFinish = false
        this.errors.error = true
        setTimeout(() => {
          teste.formCards[0].cardInstallments = null
        }, 1);
      },
      complete: (response) => {
        // Callback para todas chamadas.
      }
    });
  }

  getSenderHash() {
    PagSeguroDirectPayment.onSenderHashReady((response) => {
      if (response.status == 'error') {
        console.log(response.message);
        return false;
      }
      const hash = response.senderHash
      this.executePayment(hash)
    });
  }

  executePayment(hash) {
    const data = {
      token_cartao: this.cardData.token,
      sender_hash: hash
    }
    this.apiService.postApi<any>('gateway/efetuarpagamento/' + this.idDoComprador, data).subscribe(finish => {
      console.log(finish)
      this.dataHoraPagamento = finish.payment_date
      this.router.navigate(['/requested-pay'])
    }, err => {
      this.disableAfterFinish = false
      this.progressBarInit = false
      this.errors.error = true
    })
  }

  calculateInstallments(parcela, token, dadosCartao) {
    const data = {
      token_cartao: token,
      forma_pagamento: "creditCard",
      qtd_parcela: parcela,
      holder: {
        nome_impresso_cartao: dadosCartao.userFullName,
        documento: {
          tipo: "CPF",
          valor: dadosCartao.userCPF
        }
      }
    }
    this.apiService.postApi<any>('gateway/resumopagamento/' + this.idDoComprador, data).subscribe(resumo => {
      console.log(resumo)
      setTimeout(() => {
        document.getElementById("finishPurchase").focus();
      }, 1);
      this.obterInformacoesPedido.valor_total_pedido = resumo.total_value
      this.errors.error = false
    }), err => {
      console.log(err)
    }
  }
}