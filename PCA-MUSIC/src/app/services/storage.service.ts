import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  constructor(private storage: Storage) {
    this.init();
  }
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  private async ready() {
    if (!this._storage) {
      await this.init();
    }
  }

  // Setear datos en el Storage
  public async set(key: string, value: any) {
    await this.ready();
    return this._storage?.set(key, value);
  }

  // Obtener datos del Storage
  public async get(key: string) {
    await this.ready();
    return this._storage?.get(key);
  }

  // Removr datos del Storage
  public async remove(key: string) {
    await this.ready();
    return this._storage?.remove(key);
  }

  // Limpiar el Storage
  public async clear() {
    await this.ready();
    return this._storage?.clear();
  }

  // Obtener todos los datos del Storage
  public async getAll() {
    await this.ready();
    return this._storage?.keys();
  }

  // Obtener el tamaño del Storage
  public async lenght() {
    await this.ready();
    return this._storage?.length();
  }
}
