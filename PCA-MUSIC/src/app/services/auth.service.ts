import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { userData, userLogin } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storageService: StorageService) {}
  isLogged: boolean = false;
  async loginUser(credentials: userLogin) {
    const userData: userData = await this.storageService.get('userData');
    return new Promise((accept, reject) => {
      if (
        credentials.email === userData.email &&
        credentials.password === userData.password
      ) {
        accept('Login correcto');
        this.isLogged = true;
        this.saveLogin();
      } else reject('Credenciales incorrectas');
    });
  }

  async saveLogin() {
    if (this.isLogged) {
      await this.storageService.set('login', this.isLogged);
    }
  }
}
