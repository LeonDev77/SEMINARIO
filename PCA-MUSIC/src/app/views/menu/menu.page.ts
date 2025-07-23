import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { exitOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
// import { IonSplitPane } from '@ionic/angular/standalone';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MenuPage implements OnInit {
  constructor(private storageService: StorageService, private router: Router) {
    addIcons({ exitOutline });
  }

  ngOnInit() {}

  async goToIntro() {
    const isView: boolean = await this.storageService.get('intro');
    if (isView) {
      await this.storageService.remove('intro');
    }
    this.router.navigate(['/intro']);
  }

  async exit() {
    const isLogged: boolean = await this.storageService.get('login');
    if (isLogged) {
      await this.storageService.remove('login');
      await this.storageService.remove('intro');
    }
    this.router.navigate(['/login']);
  }
}
