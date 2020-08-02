import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) {

  }

  getApi<T>(params): Observable<T> {
    return this.http.get<T>(environment.url + params)
  }
  
  postApi<T>(params, body): Observable<T>{
    return this.http.post<T>(environment.url + params, body)
  }

  //alterar depois. Essa chamada é para buscar o status do pedido
  getApiToBeDeleted<T>(params): Observable<T>{
    console.log(params)
    return this.http.get<T>('http://localhost:3000/users/' + params)
    
  }

}



