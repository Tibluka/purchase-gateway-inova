import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
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
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  /*   @Output() filhoPpai = new EventEmitter() */

  @Input() qdtCard = 0

  cardItems = []
 
  idDoComprador = 'c479593e-b208-45d0-b153-90e2f1c49f54'

  constructor(private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.getCartInfo()
  }

  getCartInfo() {
    this.apiService.getApi<obterInformacoesPedido>('gateway/obterinformacoespedido/'+ this.idDoComprador).subscribe(carts => {
      console.log(carts)
      this.cardItems.push(carts.items)
    })
  }
}
