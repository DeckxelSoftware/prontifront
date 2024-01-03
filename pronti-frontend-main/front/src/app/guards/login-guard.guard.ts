import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../servicios/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginCanActivateChildRoutes implements CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }


  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(localStorage.getItem('jwt'));
    if (!localStorage.getItem('jwt')) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }


  }

}
