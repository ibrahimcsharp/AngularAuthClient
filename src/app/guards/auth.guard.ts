import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,

  ) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      Swal.fire({
        title: 'Access Denied',
        text: 'You must be logged in to access this page.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      this.router.navigate(['login']);
      return false;
    }
  }

}
