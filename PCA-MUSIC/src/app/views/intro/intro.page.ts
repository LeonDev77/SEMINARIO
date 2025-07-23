import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { sliderBasic } from '../../models/sliderBasic.model';
import { addIcons } from 'ionicons';
import { home } from 'ionicons/icons';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IntroPage implements OnInit {
  constructor(private router: Router, private storageService: StorageService) {
    addIcons({ home });
  }

  async ngOnInit() {}

  isView: boolean = false;
  intros: sliderBasic[] = [
    {
      name: 'Guitarra digital',
      image: 'assets/ilustracion-1.png',
      desc: 'La música trasciende pantallas. Esta ilustración muestra cómo la tecnología y el arte convergen, conectando mundos reales y virtuales a través de una guitarra y notas flotantes.',
    },
    {
      name: 'Arpista en calma',
      image: 'assets/ilustracion-2.png',
      desc: 'Una figura colorida toca un arpa con serenidad. La postura relajada y los tonos vivos transmiten armonía, creatividad y concentración en medio de un entorno imaginario.',
    },
    {
      name: 'Melodía de colores',
      image: 'assets/ilustracion-3.png',
      desc: 'Un pianista sin rostro toca un piano multicolor. La imagen evoca alegría, creatividad y expresión a través de la música, con una estética lúdica y vibrante.',
    },
    {
      name: 'Ritmo en movimiento',
      image: 'assets/ilustracion-4.png',
      desc: 'Un violinista se curva con intensidad mientras interpreta su pieza. El cuerpo se funde con la música, mostrando pasión, energía y la fuerza expresiva del violín.',
    },
  ];

  async goToHome() {
    if (!this.isView) {
      this.isView = true;
      await this.storageService.set('intro', this.isView);
      console.log('Intro Vista');
    }
    this.router.navigate(['menu/home']);
  }
}
