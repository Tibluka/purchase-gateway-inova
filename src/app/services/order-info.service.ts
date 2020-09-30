import { Injectable, NgZone } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
declare let PagSeguroDirectPayment: any;



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
  birthDate: string;
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

  address = {
    street: 'Avenida Paulista',
    number: '1116',
    complement: '',
    neighbourhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil',
    zip_code: '02220-070'
  }

  flipped = false
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
  isCreditCard = true

  navColor: ThemePalette = 'primary';
  navMode: ProgressBarMode = 'indeterminate';
  navValue = 50;
  navBufferValue = 75;

  navBarColor = 'rgb(218, 218, 218)'
  buttonColor = 'rgb(218, 218, 218)'


  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 0;
  bufferValue = 75;
  progressNavBarInit = false
  progressBarInit = false
  progressSpinnerInit = false
  cardBrandImage = ''
  errors = {
    invalid_card: false,
    error: false,
    minimunInstallmentValue: false,
  }

  paymentMethod: string = "Cartão de crédito";
  methods: string[] = ['Cartão de crédito', 'Boleto'];

  constructor(private apiService: ApiService, private router: Router, private ngZone: NgZone) {

  }

  setSessionID() {
    PagSeguroDirectPayment.setSessionId(this.obterInformacoesPedido.pagseguro_session);
  }

  async getInfo(chavePedido) {
    if (this.obterInformacoesPedido.nome_cartorio != '' && this.idDoComprador !== chavePedido) {
      this.idDoComprador = chavePedido
      this.obterInformacoesPedido = await this.apiService.getApi<any>('obterinformacoespedido?chave=' + this.idDoComprador).toPromise()
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
        this.errors.error = true
        return false;
      } else {
        this.dateIsValid = true
        this.errors.error = false
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
    console.log(this.isCreditCard);

    PagSeguroDirectPayment.onSenderHashReady((response) => {
      if (response.status == 'error') {
        console.log(response.message);
        return false;
      }
      const hash = response.senderHash
      console.log(hash)

      if (this.isCreditCard) {
        this.executePayment(hash)
      } else if (!this.isCreditCard) {

        this.executePaymentForBankBill(hash)
      }
    });
  }

  executePaymentForBankBill(hash) {
    const data = {
      sender_hash: hash
    }
    this.apiService.postApi<any>('efetuarpagamento?chave=' + this.idDoComprador, data).subscribe(finish => {
      console.log(finish)
      window.location.assign(finish.payment_link)
      this.progressBarInit = false
      this.disableAfterFinish = false
    }, err => {
      this.disableAfterFinish = false
      this.progressBarInit = false
      this.errors.error = true
    })
  }

  executePayment(hash) {
    const data = {
      token_cartao: this.cardData.token,
      sender_hash: hash
    }
    this.apiService.postApi<any>('efetuarpagamento?chave=' + this.idDoComprador, data).subscribe(finish => {
      console.log(finish)
      this.dataHoraPagamento = finish.payment_date
      this.progressBarInit = false
      this.router.navigate(['/requested-pay'])
      this.errors.minimunInstallmentValue = false
    }, err => {
      let errorCode = err.error.search('53039')
      console.log(errorCode)
      if (errorCode > 0){
        this.errors.minimunInstallmentValue = true
        document.getElementById("finishPurchase").focus();
      }else{
        this.errors.error = true
      }
        this.disableAfterFinish = false
      this.progressBarInit = false
     
    })

  }

  calculateInstallments(parcela, token, dadosCartao) {
    const data = {
      token_cartao: token,
      forma_pagamento: "creditCard",
      qtd_parcela: parcela,
      holder: {
        birth_date: this.cardData.birthDate,
        nome_impresso_cartao: dadosCartao.userFullName,
        documento: {
          tipo: "CPF",
          valor: dadosCartao.userCPF
        }
      }
    }

    console.log(data);

    this.apiService.postApi<any>('resumopagamento?chave=' + this.idDoComprador, data).subscribe(resumo => {
      console.log(resumo)
      setTimeout(() => {
        document.getElementById("finishPurchase").focus();
      }, 1);
      this.obterInformacoesPedido.valor_total_pedido = resumo.total_value
      this.errors.error = false
      this.errors.minimunInstallmentValue = false
    }), err => {
      console.log(err)
    }
  }
}