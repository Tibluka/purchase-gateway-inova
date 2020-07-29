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

@Injectable({
  providedIn: 'root'
})
export class OrderInfoService {


  idDoComprador = 'fc5479b8-b19e-4a2f-967a-9ef451788c2d'
  obterInformacoesPedido: obterInformacoesPedido = new obterInformacoesPedido()
  compraFinalizada = true
  installments: number
  progressBarInit = false


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
}