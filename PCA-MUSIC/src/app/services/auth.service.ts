import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { response, userData, userLogin } from '../models/user.model';
import { urlServer } from '../settings/appsetting';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storageService: StorageService) {}

  async loginUser(credentials: userLogin) {
    try {
      const response = await fetch(`${urlServer}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: credentials.email,
            password: credentials.password,
          },
        }),
      });

      const data: response = await response.json();

      if (!response.ok) {
        console.error('Detalles del error:', data);
        throw new Error(data.msg || 'Error en el login');
      }
      if (data.status === 'OK') {
        await this.storageService.set('loggedIn', data);
      }
      return data;
    } catch (err) {
      console.error('Error:', err);
      return err;
    }
  }
}
