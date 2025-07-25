import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { userData } from '../models/user.model';
import { urlServer } from '../settings/appsetting';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private storageService: StorageService) {}

  async addUser(data: userData) {
    return fetch(`${urlServer}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          name: data.name,
          email: data.email,
          password: data.password,
          username: data.username,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error en el registro');
        }
        // console.log(res.json());
        return res.json();
      })
      .catch((err) => {
        console.error('Error:', err);
        return err;
      });
  }
}
