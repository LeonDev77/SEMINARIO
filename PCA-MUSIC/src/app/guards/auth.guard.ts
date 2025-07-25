import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { response } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}
  async canActivate() {
    const isLogged: response = await this.storageService.get('loggedIn');
    if (isLogged) {
      // console.log(isLogged.status);
      return true;
    } else {
      return await this.router.navigate(['/login']);
    }
    // return isLogged.status === 'OK' ? true : this.router.navigate(['/login']);
  }
}
