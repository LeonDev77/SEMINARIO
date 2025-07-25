import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { response, userData, userLogin } from '../models/user.model';
import { urlServer } from '../settings/appsetting';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storageService: StorageService) {}

  loginUser(credentials: userLogin) {
    return fetch(`${urlServer}/login`, {
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
    })
      .then((res) => {
        return res.json().then((data) => {
          if (!res.ok) {
            throw 'Usuario o contraseña incorrectos';
          }

          if (data.status === 'OK') {
            this.storageService.set('loggedIn', data);
            console.log(data);
            
          }

          return data;
        });
      })
      .catch((err) => {
        // Re-lanzamos el error para que llegue al .catch() de login()
        throw err;
      });
  }
}
