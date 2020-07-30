import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
declare let PagSeguroDirectPayment: any;
declare var success: any
declare var error: any

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
  cardNumber: number;
  cvv: number;
  expirationMonth: string;
  expirationYear: string;
  userFullName: string;
  userCPF: string;
  cardValidityPeriod: string;
  installments: number;
  brand: {
    name: string;
    bin: string;
    cvvSize: number;
    expirable: boolean;
    validationAlgorithm: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class OrderInfoService {

  idDoComprador = 'e5c0881d-4a40-49b3-841c-d374adfb463f'
  obterInformacoesPedido: obterInformacoesPedido = new obterInformacoesPedido()
  cardData: cardData = new cardData()

  compraFinalizada = true
  installments: number
  progressBarInit = false
  isFormValid: boolean = true

  constructor(private apiService: ApiService) {
    this.getInfo()
  }

  async getInfo() {

    if (this.obterInformacoesPedido.nome_cartorio != '') {
      console.log('antes' + PagSeguroDirectPayment)
      this.obterInformacoesPedido = await this.apiService.getApi<any>('gateway/obterinformacoespedido/' + this.idDoComprador).toPromise()
      PagSeguroDirectPayment.setSessionId(this.obterInformacoesPedido.pagseguro_session);
    }
  }

   getBrand() {
    if (this.cardData.cardNumber.toString().length == 6) {
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


}