import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
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

  idDoComprador = 'c3160b67-8b4e-498f-8824-b79b47ace6e2'
  obterInformacoesPedido: obterInformacoesPedido = new obterInformacoesPedido()
  cardData: cardData = new cardData()
  disableButton //recebe um verdadeiro ou falso para habilitar ou desabilitar o botão finalizar do componente aside
  compraFinalizada = true
  installments = []
  progressBarInit = false

  constructor(private apiService: ApiService, private router: Router) {
    this.getInfo()
  }

  async getInfo() {

    if (this.obterInformacoesPedido.nome_cartorio != '') {
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
        console.log(response.card)
        setTimeout(navigate => {
          navigate = this.router.navigate((['/finish']))
        }, 3000);
      },
      error: (response) => {
        // Callback para chamadas que falharam.
        alert('Ocorreu um erro ao processar as informações digitadas')
        console.log(response)

      },
      complete: (response) => {
        // Callback para todas chamadas.
        console.log(response)
      }
    });
  }



}