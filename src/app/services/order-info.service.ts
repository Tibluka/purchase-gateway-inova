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

  idDoComprador = '6d124e85-160f-4e6b-a0f5-252d9fa87f5a'
  obterInformacoesPedido: obterInformacoesPedido = new obterInformacoesPedido()
  compraFinalizada = true
  installments = []

  constructor(private apiService: ApiService) {
    this.getInfo()
  }

  async getInfo() {
    if (this.obterInformacoesPedido.nome_cartorio != '') {
      this.obterInformacoesPedido = await this.apiService.getApi<any>('gateway/obterinformacoespedido/' + this.idDoComprador).toPromise()
    }
  }
}