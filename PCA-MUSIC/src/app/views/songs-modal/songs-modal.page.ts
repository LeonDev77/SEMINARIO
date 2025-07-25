import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavParams } from '@ionic/angular';
import { song } from 'src/app/models/song.model';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SongsModalPage implements OnInit {
  songs: song[] = [];
  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.songs = this.navParams.data['songs'];
    // console.log('recibi:', this.songs);
  }

  close() {
    this.modalCtrl.dismiss(null, 'close');
  }

  selectedSong(song: song) {
    this.modalCtrl.dismiss(song);
  }
}
