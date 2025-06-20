import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer'
import { map, take } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
  private authService = inject(AuthService);
  private router = inject(Router);
  private store = inject(Store<fromRoot.State>)
     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(fromRoot.getIsAuth).pipe(
      take(1),
      map(isAuth => isAuth ? true : this.router.createUrlTree(['/login']))
    );
  }
}