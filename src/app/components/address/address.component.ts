import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { OrderInfoService } from 'src/app/services/order-info.service';

interface buscaCep {
  cep: string;
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string;
  uf: string,
  pais: string
}

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  buscaCepUrl = 'https://viacep.com.br/ws/'
  profileForm = this.fb.group({
    cep: [''],
    logradouro: [''],
    numero: [''],
    complemento: [''],
    bairro: [''],
    cidade: [''],
    uf: [''],
    pais: ['']
  })

  constructor(private fb: FormBuilder, private apiService: ApiService, public orderInfoService: OrderInfoService) { }

  ngOnInit(): void {
    const endereco = this.orderInfoService.obterInformacoesPedido.comprador.endereco
    if (endereco) {
      this.profileForm = this.fb.group({
        cep: [endereco.cep],
        logradouro: [endereco.logradouro],
        numero: [endereco.numero],
        complemento: [endereco.complemento],
        bairro: [endereco.bairro],
        cidade: [endereco.cidade],
        uf: [endereco.uf],
        pais: ['BRA']
      })
    } else {
      this.profileForm = this.fb.group({
        cep: [],
        logradouro: [''],
        numero: [''],
        complemento: [''],
        bairro: [''],
        cidade: [''],
        uf: [''],
        pais: ['BRA']
      })
    }
  }
  buscaCep(params) {
    if (this.profileForm.get('cep').value.length === 8) {
      this.apiService.getCepApi(this.buscaCepUrl + params + '/json').subscribe((res: buscaCep) => {
        this.profileForm.get('logradouro').setValue(res.logradouro)
        this.profileForm.get('bairro').setValue(res.bairro)
        this.profileForm.get('cidade').setValue(res.localidade)
        this.profileForm.get('uf').setValue(res.uf)
      })
    }
  }

  checkAddress() {
    this.orderInfoService.address = this.profileForm
    this.orderInfoService.changeCheckboxValue()
  }
}
