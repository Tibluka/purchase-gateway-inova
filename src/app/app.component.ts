import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

interface obterInformacoesPedido {
  pagseguro_session: string;
  nome_cartorio: string;
  logo_url: string;
  cor_cartorio: string;
  documento: {
    tipo: string;
    valor: string;
  };
  items:[{
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'purchase-gateway-inova';

  constructor(private apiService: ApiService) {
    this.getCartInfo()
  }

  idDoComprador = 'c479593e-b208-45d0-b153-90e2f1c49f54'
  cartItems = []
  
  getCartInfo() {
    this.apiService.getApi<obterInformacoesPedido>('gateway/obterinformacoespedido/'+ this.idDoComprador).subscribe(cartorio => {
      this.cartItems.push(cartorio)
      console.log(cartorio)
    })
  }
}
