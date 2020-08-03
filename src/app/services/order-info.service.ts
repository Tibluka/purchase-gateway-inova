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
      console.log(this.obterInformacoesPedido.pagseguro_session)
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

  createCardToken(parcela) {
    
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
        this.cardData.token = response.card.token
        this.calculateInstallments(parcela, response.card.token, dadosCartao)
        console.log(response.card.token)
        
      },
      error: (response) => {
        // Callback para chamadas que falharam.
        this.mode = 'determinate';
        this.compraFinalizada = !this.compraFinalizada

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
      console.log(hash) //Hash estará disponível nesta variável.
      this.executePayment(hash)
    });
  }

  executePayment(hash) {
    const data = {
      token_cartao: this.cardData.token,   
      sender_hash: hash   
    }
    this.apiService.postApi<any>('gateway/efetuarpagamento/' + this.idDoComprador, data).subscribe(finish => {
      console.log('funfou', finish)
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
      console.log('deucerto', resumo)
      this.obterInformacoesPedido.valor_total_pedido = resumo.total_value
    })
  }

}