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

  idDoComprador = 'c479593e-b208-45d0-b153-90e2f1c49f54'
  obterInformacoesPedido: obterInformacoesPedido = new obterInformacoesPedido()
  compraFinalizada = false
  compraNaoFinalizada = false

  constructor(private apiService: ApiService) {
    this.getInfo()
  }

  async getInfo() {
    if (this.obterInformacoesPedido.nome_cartorio != '') {
      this.obterInformacoesPedido = await this.apiService.getApi<any>('gateway/obterinformacoespedido/' + this.idDoComprador).toPromise()
    }
  }
}