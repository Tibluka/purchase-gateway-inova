import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorGuard implements CanActivate, CanActivateChild {

  constructor(private apiService: ApiService, private route: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /*     return this.apiService.getApiToBeDeleted(next.params.id).pipe(
     */
    return this.apiService.getApiToBeDeleted('2').pipe(
      map(resp => {
        if (resp['status'] === 1) { //em aberto
          return true
        } else if (resp['status'] === 2) {// pagamento solicitado
          this.route.navigate(['/finish'])
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
      })
    )

  }



}
