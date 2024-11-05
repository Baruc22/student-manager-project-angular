import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class authGuard {
  constructor(private router: Router) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('profesorID');
    if (token) {
      return true;
    }
    return false;
  }

  canActivate(): boolean {
    if (this.isAuthenticated()) {
      return true;
    } else {
      this.router.navigateByUrl('login');
      return false;
    }
  }
}