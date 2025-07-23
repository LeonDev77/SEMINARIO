import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}
  async canActivate() {
    const isLogged: boolean = await this.storageService.get('login');
    return isLogged === true ? true : this.router.navigate(['/login']);
  }
}
