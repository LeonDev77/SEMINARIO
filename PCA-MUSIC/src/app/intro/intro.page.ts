import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { instrumentos } from '../models/instrumentos.model';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IntroPage implements OnInit {
  constructor(private router: Router, private storageService: StorageService) {}

  async ngOnInit() {}

  isView: boolean = false;
  instrumentos: instrumentos[] = [
    {
      name: 'Guitarra Acustica',
      image:
        'https://i.pinimg.com/1200x/b9/77/38/b97738f984d989a202317c66f02b2027.jpg',
      desc: 'Instrumento de cuerda pulsada con caja de resonancia y seis cuerdas. Se toca con dedos o púa, ideal para acompañamiento y solos. Versátil en géneros como folk, pop y flamenco. Portátil y con sonido cálido, suele usarse en música tradicional y contemporánea.',
    },
    {
      name: 'Violin',
      image:
        'https://i.pinimg.com/736x/67/1f/c2/671fc2ad76f36a2b22c7c18648df5114.jpg',
      desc: 'Pequeño instrumento de cuerda frotada con cuatro cuerdas y sonido agudo. Se toca con arco o pizzicato. Esencial en orquestas, música clásica y folk. Requiere precisión en la afinación y técnica, pero ofrece gran expresividad melódica.',
    },
    {
      name: 'Piano',
      image:
        'https://i.pinimg.com/736x/df/70/df/df70dfd7d2828f43d560a6b73faf4c59.jpg',
      desc: 'Instrumento de tecla y percusión con 88 notas. Produce sonido al golpear cuerdas con martillos. Versátil en clásica, jazz y pop. Permite melodías y acordes simultáneos, siendo fundamental como solista o acompañante. Acústico o digital, es clave en la formación musical.',
    },
  ];

  async goToHome() {
    if (!this.isView) {
      this.isView = true;
      await this.storageService.set('intro', this.isView);
      console.log('Intro Vista');
    }
    this.router.navigate(['/home']);
  }
}
