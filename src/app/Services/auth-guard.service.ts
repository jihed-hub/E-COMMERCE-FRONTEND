import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private auth: ApiService, private router: Router) { }
  canActivate(): boolean {
    if (!this.auth.isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
