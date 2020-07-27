import { Injectable } from '@angular/core';
import { ApiService } from './api.service';


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

  idDoComprador = 'ad9f4365-8e78-46e4-8d7c-274bb2dfa067'
  obterInformacoesPedido: obterInformacoesPedido = new obterInformacoesPedido()
  compraFinalizada = true
  installments: number
  progressBarInit = false

  constructor(private apiService: ApiService) {
    this.getInfo()
  }

  async getInfo() {
    if (this.obterInformacoesPedido.nome_cartorio != '') {
      this.obterInformacoesPedido = await this.apiService.getApi<any>('gateway/obterinformacoespedido/' + this.idDoComprador).toPromise()
    }
  }
}