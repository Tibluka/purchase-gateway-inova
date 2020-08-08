import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { OrderInfoService } from 'src/app/services/order-info.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';

interface obterInformacoesPedido {
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

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  /*   @Output() filhoPpai = new EventEmitter() */

  @Input() qtdCard: number;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 0;
  bufferValue = 75;


  constructor(
    private apiService: ApiService,
    public orderInfoService: OrderInfoService,
    private router: Router,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.orderInfoService.progressBarInit = false
  }

  finish() {
    this.orderInfoService.disableAfterFinish = true
    this.orderInfoService.progressBarInit = true
    this.orderInfoService.mode = 'indeterminate'
     this.orderInfoService.getSenderHash()
  }


}
