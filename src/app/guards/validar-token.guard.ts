import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../auth/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(
    public router: Router,
    public authService: AuthService
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean | UrlTree {
    const isLogged = this.authService.isLogged();
    if (!isLogged) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean | UrlTree {
    const isLogged = this.authService.isLogged();
    if (!isLogged) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
