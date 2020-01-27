import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private api: ApiService,
              private router: Router) { }
              canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

                if (!this.api.isUserLoggedIn()) {
                  this.router.navigate(['login']);
                  return false;
                } else {
                  return true;
                }
              }
}
