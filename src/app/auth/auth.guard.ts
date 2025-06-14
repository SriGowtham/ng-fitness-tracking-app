import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate{
  private authService = inject(AuthService);
  private router = inject(Router)
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      if(this.authService.isAuth()){
        return true;
      }
      return this.router.createUrlTree(['/login'])
    }
}