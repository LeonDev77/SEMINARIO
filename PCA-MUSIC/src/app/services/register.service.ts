import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { userData } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private storageService: StorageService) {}

  async addUser(data: userData) {
    await this.storageService.set('userData', {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });
  }

  async isSuccessful() {
    const userData: userData = await this.storageService.get('userData');
    return new Promise((accept, reject) => {
      if (userData) {
        accept('Registro exitoso');
      } else reject('El registro ha fallado');
    });
  }
}
