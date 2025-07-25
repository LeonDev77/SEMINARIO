import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgClass } from '@angular/common';
import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { sliderBasic } from '../../models/sliderBasic.model';
import { response, userData, userInfo } from 'src/app/models/user.model';
import { MusicService } from 'src/app/services/music.service';
import { SongsModalPage } from '../songs-modal/songs-modal.page';
import { ArtistService } from 'src/app/services/artist.service';
import { favoriteSong, song } from 'src/app/models/song.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [NgClass, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  constructor(
    private storageService: StorageService,
    private router: Router,
    private musicService: MusicService,
    private artistService: ArtistService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {
    addIcons(allIcons);
  }

  async ngOnInit() {
    await this.loadAllData();
  }

  // Modos de color
  lightM: string = 'light';
  darkM: string = 'dark';
  primaryM: string = 'primary';
  tertiaryM: string = 'tertiary';

  // Modo de color inicial
  colorM: string = this.lightM;

  // Botones
  iconLight: string = 'sunny';
  iconDark: string = 'moon';
  iconM: string = this.iconLight;
  btnM: string = this.darkM;

  // Nombre del usuario logueado
  userLogged!: userInfo;

  //
  tracks: song[] = [];
  albums: any = '';
  artists: any = '';
  localArtists: any = '';
  song: song = {
    album_id: 0,
    artist_id: 0,
    created_at: '',
    disc_number: 0,
    duration_ms: 0,
    id: 0,
    name: '',
    preview_url: '',
    track_number: 0,
    updated_at: '',
    playing: false,
  };
  currentSong: any;
  newTime: any = 0;
  favoriteSongs: song[] = [];
  allFavorites: favoriteSong[] = [];
  // [Tarea]: Agregar información de minimo 3 slides para mostrar en la vista. ✅
  // [Tarea]: Cambiar mediante el click de un boton el tema (color)  de los slides. ✅

  cantantes: sliderBasic[] = [
    {
      name: 'Daddy Yankee',
      image:
        'https://i.pinimg.com/1200x/fe/bb/ed/febbed7ad13efee48025fcc6f9d99f11.jpg',
      desc: 'Conocido como el Rey del Reguetón, Daddy Yankee revolucionó la música urbana con su energía, estilo y éxitos mundiales como Gasolina. Su legado marcó una era y abrió camino a generaciones de artistas latinos.',
    },
    {
      name: 'Ed Sheeran',
      image:
        'https://i.pinimg.com/1200x/4b/7b/c9/4b7bc96c63cb960f1ae5eaac08cec28f.jpg',
      desc: 'Ed Sheeran es un cantautor británico que ha conquistado el mundo con sus baladas sinceras, melodías pegajosas y letras emotivas. Su autenticidad lo ha convertido en uno de los artistas más queridos de su generación.',
    },
    {
      name: 'Feid',
      image:
        'https://i.pinimg.com/736x/fc/4d/6c/fc4d6caceaee5b6a5f58025bce133357.jpg',
      desc: 'Feid, también conocido como Ferxxo, es una de las voces más destacadas del reguetón moderno. Con un estilo fresco, letras sinceras y una identidad visual inconfundible, ha conquistado a una nueva generación con éxitos que combinan ritmo y sentimiento.',
    },
    {
      name: 'Diomedes Díaz',
      image:
        'https://i.pinimg.com/736x/36/56/1b/36561b14113bf01d5e96c2d57a66f5c6.jpg',
      desc: 'Diomedes Díaz, El Cacique de La Junta, es una leyenda del vallenato colombiano. Con su voz inconfundible y carisma arrollador, dejó un legado musical eterno que sigue vivo en el corazón del pueblo.',
    },
  ];

  async CambiarModo() {
    this.colorM = this.colorM === this.lightM ? this.darkM : this.lightM;

    this.iconM = this.iconM === this.iconDark ? this.iconLight : this.iconDark;

    this.btnM = this.btnM === this.darkM ? this.lightM : this.darkM;

    // this.btncolorM= this.btncolorM=== this.btnDark ? this.btnLight : this.btnDark;

    await this.storageService.set('colorM', this.colorM);
    await this.storageService.set('iconM', this.iconM);
    await this.storageService.set('btnM', this.btnM);
  }

  async loadStorageData() {
    const colorMSaved: string = await this.storageService.get('colorM');
    const iconMSaved: string = await this.storageService.get('iconM');
    const btnMSaved: string = await this.storageService.get('btnM');
    const userData: response = await this.storageService.get('loggedIn');

    if (colorMSaved.length !== 0) {
      this.colorM = colorMSaved;
      //
    }
    if (iconMSaved.length !== 0) {
      this.iconM = iconMSaved;
      //
    }
    if (btnMSaved.length !== 0) {
      this.btnM = btnMSaved;
      //
    }
    if (userData.user.username.length !== 0) {
      this.userLogged = userData.user;
      //
    }
  }

  async loadAllData() {
    await this.loadStorageData();
    await this.loadTracks();
    await this.loadAlbums();
    await this.loadArtists();
    await this.loadFavoriteSongs();
    await this.loadAllFavorites();
  }

  // Cargar las canciones desde la API
  async loadTracks() {
    await this.musicService.getTracks().then((tracks) => {
      this.tracks = tracks;
    });
  }

  // Cargar los albumnes desde la API
  async loadAlbums() {
    await this.musicService.getAlbums().then((albums) => {
      this.albums = albums;
    });
  }

  // Cargar los artistas desde la API
  async loadArtists() {
    await this.artistService.getArtists().then((artists) => {
      this.artists = artists;
    });
  }

  async loadAllFavorites() {
    await this.musicService.getAllFavorites().then((favorites) => {
      this.allFavorites = favorites;
      // console.log(this.allFavorites);
    });
  }

  async loadFavoriteSongs() {
    if (this.userLogged) {
      const user_id = this.userLogged.id;
      if (user_id !== 0) {
        await this.musicService.getFavoriteSongs(user_id).then((songs) => {
          this.favoriteSongs = songs;
        });
      }
    }
  }

  // Mostrar todas las canciones por album
  async showSongsByAlbum(albumId: number) {
    const songs: song[] = await this.musicService.getSongsByAlbums(albumId);

    const modal = await this.modalCtrl.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs,
      },
    });
    modal
      .onDidDismiss()
      .then((res) => {
        if (res.data) {
          this.song = res.data;

          if (this.song.preview_url !== '') {
            this.currentSong = new Audio(this.song.preview_url);
            this.favoriteSongs.forEach((favSong) => {
              if (favSong.id === this.song.id) {
                this.isFavorite = true;
              } else {
                this.isFavorite = false;
              }
            });
          }
        }
      })
      .catch((err) => {});

    modal.present();
  }

  // Mostrar todas las canciones por artista
  async showSongsByArtist(artistId: number) {
    const songs: song[] = await this.musicService.getSongsByArtists(artistId);

    const modal = await this.modalCtrl.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs,
      },
    });
    modal
      .onDidDismiss()
      .then((res) => {
        if (res.data) {
          this.song = res.data;
          if (this.song.preview_url !== '') {
            this.currentSong = new Audio(this.song.preview_url);
            this.favoriteSongs.forEach((favSong) => {
              if (favSong.id === this.song.id) {
                this.isFavorite = true;
              } else {
                this.isFavorite = false;
              }
            });
          }
        }
      })
      .catch((err) => {});
    modal.present();
  }

  play() {
    if (this.song.preview_url === '') {
      this.alertMessage('Por favor seleccione una canción');
    }
    if (this.song.preview_url !== '') {
      this.currentSong.addEventListener('timeupdate', () => {
        this.newTime = this.currentSong.currentTime / this.currentSong.duration;
      });
      this.song.playing = true;
      this.currentSong.play();
    }
  }

  pause() {
    this.currentSong.pause();
    this.song.playing = false;
  }

  async alertMessage(header: string, btn: string = 'ok') {
    const alert = await this.alertCtrl.create({
      header: header,
      buttons: [btn],
    });

    await alert.present();
  }

  formatTime(seconds: number) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  getRemainingTime() {
    if (!this.currentSong?.duration || !this.currentSong?.currentTime) {
      return 0;
    }
    return this.currentSong.duration - this.currentSong.currentTime;
  }

  isFavorite = false;

  async like() {
    if (this.song.preview_url === '') {
      this.alertMessage('Por favor seleccione una canción');
    }
    if (this.song.preview_url !== '') {
      const user_id = this.userLogged.id;
      const track_id = this.song.id;
      if (user_id !== 0) {
        await this.musicService.addFavoriteSongs(user_id, track_id);
      }
      this.isFavorite = true;
      this.loadAllData();
    }
  }

  browseFavoriteSongs() {
    this.favoriteSongs.forEach((song) => {
      return song.id;
    });
  }

  async dislike() {
    if (this.allFavorites) {
      this.allFavorites.forEach((favorite) => {
        if (
          favorite.user_id === this.userLogged.id &&
          favorite.track_id === this.song.id
        ) {
          const track_id = favorite.id;
          if (track_id !== 0) {
            this.musicService.deleteFavoriteSongs(track_id);
          }
          this.isFavorite = false;
          this.loadAllData();
        }
      });
    }
  }
}
