import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

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

  constructor(private fb: FormBuilder, private apiService: ApiService) { }

  @ViewChild('formInstallments', { read: NgForm }) formValid: any //permite visualizar o html e o formulario dentro dele com o id especificado.

  ngOnInit(): void {
  }

  buscaCep(params){
    if (this.profileForm.get('cep').value.length === 8) {
      this.apiService.getCepApi(this.buscaCepUrl + params + '/json').subscribe((res: buscaCep) => {
        this.profileForm.get('logradouro').setValue(res.logradouro)
        this.profileForm.get('bairro').setValue(res.bairro)
        this.profileForm.get('cidade').setValue(res.localidade)
        this.profileForm.get('uf').setValue(res.uf)
      })
    }
  }
}
