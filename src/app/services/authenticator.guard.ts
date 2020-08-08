import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { map, catchError } from 'rxjs/operators';
import { OrderInfoService } from './order-info.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorGuard implements CanActivate, CanActivateChild {

  constructor(private apiService: ApiService, private route: Router, private orderInfoService: OrderInfoService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.apiService.getApi('gateway/obterinformacoespedido/' + next.params.id).pipe(
      map(resp => {
        console.log(next.params.id);
        this.orderInfoService.obterInformacoesPedido = resp as any
        this.orderInfoService.idDoComprador = next.params.id
        this.orderInfoService.setSessionID()
        if (!resp['payment_status']) { //em aberto
          localStorage.setItem('previousUrl', state.url)
          return true
        } else if (resp['payment_status']['code'] === 2) {// pagamento solicitado
          localStorage.setItem('previousUrl', state.url)
          this.route.navigate(['/requested-pay'])
          return false
        } else if (resp['payment_status']['code'] === 3) {// pago parcialmente
          this.route.navigate(['/error'])
          return false
        } else if (resp['payment_status']['code'] === 4) {//pagamento aprovado
          this.route.navigate(['/finish'])
          return false
        }
      }), catchError((error) => {
        this.route.navigate(['/error'])
        return of(false)
      })
    )
  }



}
/*   map(resp => {
        console.log(resp)
        if (resp['status'] === 1) { //em aberto
          return true
        } else if (resp['status'] === 2) {// pagamento solicitado
          this.route.navigate(['/requested-pay'])
          return false
        } else if (resp['status'] === 3) {// pago parcialmente
          this.route.navigate(['/error'])
          return false
        } else if (resp['status'] === 4) {//pagamento aprovado
          this.route.navigate(['/finish'])
          return false
        }
      }), catchError((error) => {
        return of(false)
      }) */