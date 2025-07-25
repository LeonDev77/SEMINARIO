import { Injectable } from '@angular/core';
import { urlServer } from '../settings/appsetting';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  constructor() {}

  getArtists() {
    return fetch(`${urlServer}/artists`)
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  }

  getArtistsById(artistId: number) {
    return fetch(`${urlServer}/artists/${artistId}`)
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  }
}
