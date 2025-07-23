import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular/standalone';
import { userData } from 'src/app/models/user.model';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  schemas: [],
})
export class RegisterPage implements OnInit {
  // Definir el formulario de registro
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private registerService: RegisterService
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required, // Campo obligatorio
        ])
      ),
      lastName: new FormControl(
        '',
        Validators.compose([
          Validators.required, // Campo obligatorio
        ])
      ),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required, // Campo obligatorio
          Validators.email, // Campo debe ser un email
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required, // Campo obligatorio
          Validators.minLength(7), // Campo debe tener al menos 7 caracteres
        ])
      ),
    });
  }

  ngOnInit() {}

  register(data: userData) {
    console.log(data);

    this.registerService
      .addUser(data)
      .then((res) => {
        this.navCtrl.navigateForward('/login');
      })
      .catch((err) => {
        console.log(err);
        this.alertMessage(err);
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  async alertMessage(header: string, btn: string = 'ok') {
    const alert = await this.alertCtrl.create({
      header: header,
      buttons: [btn],
    });

    await alert.present();
  }
}
