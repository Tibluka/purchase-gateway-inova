import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

interface obterInformacoesPedido {
  pagseguro_session: string;
  id_comprador: string;
  id_cartorio: string;
  email_cartorio: string;
  token_cartorio_pagseguro: string;
  documento: {
    tipo: string;
    valor: string;
  };
  items:[{
    descricao: string;
    qtd: number;
    valor_unitario: number;
  }];
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
 
  idDoComprador = 'e4155eaf-0813-4d5c-94ba-c53aae422ccf'

  constructor(private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.getCartInfo()
  }

  getCartInfo() {
    this.apiService.getApi<obterInformacoesPedido>('gateway/obterinformacoespedido/'+ this.idDoComprador).subscribe(carts => {
      console.log(carts)
      this.cardItems.push(carts.items)
      console.log(carts.items)
    })
  }
}
