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
    const dadosCartao = {
      ...this.cardData,
      brand: this.cardData.brand.name,
      expirationMonth: this.cardData.cardValidityPeriod.substring(0, 2),
      expirationYear: this.cardData.cardValidityPeriod.substring(2, 6)
    }
    this.mode = 'indeterminate';
    console.log(dadosCartao)
    PagSeguroDirectPayment.createCardToken({
      ...dadosCartao,
      success: (response) => {
        // Retorna o cartão tokenizado.
        this.getSenderHash(response.card.token, dadosCartao)
        console.log(response)
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

  getSenderHash(token, dadosCartao) {
    PagSeguroDirectPayment.onSenderHashReady((response) => {
      if (response.status == 'error') {
        console.log(response.message);
        return false;
      }
      const hash = response.senderHash
      this.executePayment(token, dadosCartao, hash)
      console.log(hash) //Hash estará disponível nesta variável.
    });
  }

  async executePayment(token, dadosCartao, hash) {
    const data = {
      token_cartao: token,
      forma_pagamento: "creditCard",
      sender_hash: hash,
      holder: {
        nome_impresso_cartao: dadosCartao.userFullName,
        documento: {
          tipo: "CPF",
          valor: dadosCartao.userCPF
        }
      }
    }
    this.apiService.postApi('efetuarpagamento/' + this.idDoComprador, data).subscribe(response => {
      this.ngZone.run(() => this.router.navigate(['/finish']))
    })
    console.log(dadosCartao, token)
  }

}