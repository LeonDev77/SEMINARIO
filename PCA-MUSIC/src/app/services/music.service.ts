// import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import * as dataArtist from './artistas.json';
import { urlServer } from '../settings/appsetting';
import { favoriteSong } from '../models/song.model';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  constructor() {}

  // Buscar todas las canciones con fetch
  async getTracks() {
    return fetch(`${urlServer}/tracks`)
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  }

  async getAlbums() {
    return fetch(`${urlServer}/albums`)
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  }

  async getSongsByAlbums(albumId: number) {
    return fetch(`${urlServer}/tracks/album/${albumId}`)
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  }

  async getSongsByArtists(artistId: number) {
    return fetch(`${urlServer}/tracks/artist/${artistId}`)
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  }

  async addFavoriteSongs(user_id: number, track_id: number) {
    try {
      const res = await fetch(`${urlServer}/favorite_tracks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          favorite_track: {
            user_id: user_id,
            track_id: track_id,
          },
        }),
      });

      const data: favoriteSong = await res.json();
      console.log(data);

      if (!res.ok) {
        console.error('Detalles del error:', data);
        throw new Error(data.created_at || 'Error al agregar');
      }
      return data;
    } catch (err) {
      console.error('Error:', err);
      return err;
    }
  }

  async getAllFavorites() {
    try {
      const res = await fetch(`${urlServer}/favorite_tracks`);
      const data = await res.json();
      // console.log(data);
      return data;
    } catch (err) {
      console.error('Error al obtener favoritos:', err);
      return err;
    }
  }

  async getFavoriteSongs(user_id: number) {
    try {
      const res = await fetch(`${urlServer}/user_favorites/${user_id}`);
      const data = await res.json();
      // console.log(data);
      return data;
    } catch (err) {
      console.error('Error al obtener favoritos:', err);
      return err;
    }
  }

  async deleteFavoriteSongs(track_id: number) {
    try {
      const res = await fetch(`${urlServer}/favorite_tracks/${track_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Detalles del error:', data);
        throw new Error(data.message || 'Error al eliminar');
      }

      console.log('Canción eliminada de favoritos:', data);
      return data;
    } catch (err) {
      // console.error('Error:', err);
      return err;
    }
  }
}
