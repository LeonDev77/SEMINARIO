import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgClass } from '@angular/common';
import { addIcons } from 'ionicons';
import { exitOutline, moon, sunny } from 'ionicons/icons';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { sliderBasic } from '../../models/sliderBasic.model';
import { userData } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [NgClass, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  constructor(private storageService: StorageService, private router: Router) {
    addIcons({ moon, sunny, exitOutline });
    this.loadStorageData();
  }

  async ngOnInit() {}

  // Modos de color
  lightM: string = 'light';
  darkM: string = 'dark';
  primaryM: string = 'primary';
  tertiaryM: string = 'tertiary';

  // Modo de color inicial
  colorM: string = this.lightM;

  // Tarjetas
  cardM: string = this.primaryM;

  // Botones
  iconLight: string = 'sunny';
  iconDark: string = 'moon';
  iconM: string = this.iconLight;
  btnM: string = this.darkM;

  // Nombre del usuario logueado
  userLogged: string = '';

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

    this.cardM = this.cardM === this.primaryM ? this.lightM : this.primaryM;

    // this.btncolorM= this.btncolorM=== this.btnDark ? this.btnLight : this.btnDark;

    await this.storageService.set('colorM', this.colorM);
    await this.storageService.set('iconM', this.iconM);
    await this.storageService.set('cardM', this.cardM);
  }

  async loadStorageData() {
    const colorMSaved: string = await this.storageService.get('colorM');
    const iconMSaved: string = await this.storageService.get('iconM');
    const cardMSaved: string = await this.storageService.get('cardM');
    const userData: userData = await this.storageService.get('userData');

    if (colorMSaved.length !== 0) {
      this.colorM = colorMSaved;
      console.log(colorMSaved);
    }
    if (iconMSaved.length !== 0) {
      this.iconM = iconMSaved;
      console.log(iconMSaved);
    }
    if (cardMSaved.length !== 0) {
      this.cardM = cardMSaved;
      console.log(cardMSaved);
    }
    if (userData.name.length !== 0 && userData.lastName.length !== 0) {
      this.userLogged = userData.name + ' ' + userData.lastName;
      console.log(this.userLogged);
    }
  }
}
