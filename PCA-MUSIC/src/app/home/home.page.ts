import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgClass } from '@angular/common';
import { addIcons } from 'ionicons';
import { moon, sunny } from 'ionicons/icons';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

interface raza {
  title: string;
  image: string;
  description: string;
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [NgClass, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  constructor(private storageService: StorageService, private router: Router) {
    addIcons({ moon, sunny });
  }

  async ngOnInit() {
    await this.loadStorageData();
  }

  colorP: string = 'var(--bg-p)';
  colorS: string = 'var(--bg-s)';
  colorActual: string = this.colorP;
  light: string = 'slide-light';
  mode = '';
  iLight: string = 'sunny';
  iDark: string = 'moon';
  modeIcon: string = this.iLight;
  btnLight: string = 'light';
  btnDark: string = 'dark';
  btnMode: string = this.btnDark;

  // [Tarea]: Agregar información de minimo 3 slides para mostrar en la vista. ✅
  // [Tarea]: Cambiar mediante el click de un boton el tema (color)  de los slides. ✅

  perros: raza[] = [
    {
      title: 'Pastor Alemán',
      image:
        'https://i.pinimg.com/736x/a7/1d/32/a71d323694a26924fe6d2ee17088232a.jpg',
      description:
        'Uno de los caninos más leales que puedas encontrar. Dócil y de un buen temperamento hacen que sean las más apetecidas por los amantes de este tipo de razas. Aunque sufren de problemas en la cadera, pero pueden ser tratados tempranamente y así tener una mejor calidad de vida.',
    },
    {
      title: 'Labrador',
      image:
        'https://i.pinimg.com/736x/04/24/20/0424200236194aa7fb0b2746d367754c.jpg',
      description:
        'Otro perro inteligente, dócil, de temperamento tranquilo, paciente y noble en su etapa madura. Aprenden rápido y son perfectos para hacer compañía.',
    },
    {
      title: 'Golden Retriever',
      image:
        'https://i.pinimg.com/736x/7b/70/f2/7b70f2601568f792edc52d23879df914.jpg',
      description:
        'Dócil, con temperamento tranquilo en la mayoría de su vida. Son inteligentes y son bastante entendidos con los niños.',
    },
    {
      title: 'San Bernardo',
      image:
        'https://i.pinimg.com/736x/2b/a8/f4/2ba8f4b77abdd7499073d52449e7c5f0.jpg',
      description:
        'De los más grandes y famosos por películas de Hollywood. Superan los 75cm, son robustos y musculosos. Aunque no son muy ágiles, este perro es un gran guardián y muy temperamental.',
    },
    {
      title: 'Dálmata',
      image:
        'https://i.pinimg.com/736x/81/74/66/817466fe72b2c944f39fe08517b6018a.jpg',
      description:
        'De los más inquietos del listado. También son famosos por las películas y sus manchas particulares por todo el cuerpo. Esta raza europea es ágil en toda su vida y son un gran compañero para personas activas.',
    },
    {
      title: 'Husky Siberiano',
      image:
        'https://i.pinimg.com/736x/34/98/4c/34984ce09547f40f402525598f13b827.jpg',
      description:
        'Está raza proviene de Asia y Europa. Tiene una esperanza de vida de casi 15 años y son de los más saludables a su debida resistencia y adaptabilidad a diferentes medios. Los Husky son ágiles y grandes compañeros que se llevan muy bien con los niños.',
    },
    {
      title: 'Border Collie',
      image:
        'https://i.pinimg.com/736x/8b/46/59/8b46593423246eab1625f25aea55ea23.jpg',
      description:
        'De porte elegante son una raza originaria del Reino Unido. Estos perros suelen participar en algunos deportes como el famoso agility en Europa. Esta es una competencia donde los perros deben superar una serie de obstáculos siguiendo únicamente los comandos de sus guías. Son muy inteligentes, ágiles y activos en toda su vida.',
    },
    {
      title: 'Gran Danés',
      image:
        'https://i.pinimg.com/736x/1d/03/b1/1d03b11a51140d86fa1587939b09e75d.jpg',
      description:
        'Son perros que superan los 80cm de altura y pueden llegar a pesar hasta 100kg. Son muy inteligentes, dóciles, cariñosos y muy obedientes a pesar de su temperamento. Esta es otra raza que puede llegar a presentar problemas articulares.',
    },
    {
      title: 'Boyeros de Berna',
      image:
        'https://i.pinimg.com/736x/c1/40/46/c1404610aa6dc9f7b67d29ea21e9ff9b.jpg',
      description:
        'Originaria de Suiza son uno de los perros más amigables con los niños. Protectores con su familia; aunque no son ágiles, son muy temperamentales y pueden compartir con otros animales en el hogar.',
    },
    {
      title: 'Rottweiler',
      image:
        'https://i.pinimg.com/736x/30/85/c2/3085c2cfe9eb817a771af8806ac6db16.jpg',
      description:
        'Originario de Alemania es uno de los perros más fuertes, robustos y muy atléticos. La apariencia de este perro da mucho respeto y temor debido a la fama producida por películas de terror. Aunque son algo temperamentales son grandes guardianes y muy leales”.',
    },
    {
      title: 'Doberman',
      image:
        'https://i.pinimg.com/1200x/f5/23/ac/f523acccd59ce28b8743158194b3487d.jpg',
      description:
        'Hablar del doberman precio es hablar de una de las razas más admiradas por su elegancia, agilidad y carácter protector. El dóberman no solo es un excelente guardián, sino también un compañero leal e inteligente, ideal para personas activas que buscan un perro fuerte y obediente.',
    },
  ];

  async CambiarColor() {
    this.colorActual =
      this.colorActual === this.colorP ? this.colorS : this.colorP;
    await this.storageService.set('theme', this.colorActual);
    console.log('Tema guardado: ', this.colorActual);
  }

  CambiarModo() {
    this.mode = this.mode === this.light ? '' : this.light;
    this.modeIcon = this.modeIcon === this.iDark ? this.iLight : this.iDark;
    // this.btnMode = this.btnMode === this.btnDark ? this.btnLight : this.btnDark;
  }

  async loadStorageData() {
    const savedTheme: string = await this.storageService.get('theme');
    if (savedTheme) {
      this.colorActual = savedTheme;
    }
  }

  async goToIntro() {
    const isView: boolean = await this.storageService.get('intro');
    if (isView) {
      await this.storageService.remove('intro');
    }
    this.router.navigate(['/intro']);
  }
}
