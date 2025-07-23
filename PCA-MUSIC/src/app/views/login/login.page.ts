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
import { AlertController, IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { userLogin } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  // Mensaje de error
  errorMessage: string = '';

  // Definir el formulariode inicio de sesión
  loginForm: FormGroup;

  // Definir mensajes de error
  ValidationMessages = {
    email: [
      {
        type: 'email',
        message: 'Email incorrecto',
      },
      {
        type: 'required',
        message: 'El email es obligatorio',
      },
    ],
    password: [
      {
        type: 'password',
        message: 'Contraseña incorrecta',
      },
      {
        type: 'required',
        message: 'La contraseña es obligatoria',
      },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required, // campo obrigatório
          Validators.email, // campo deve ser un e-mail
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required, // campo obrigatório
          Validators.minLength(7), // Minimo 7 caracteres
        ])
      ),
      // email: new FormControl('', Validators.compose([Validators.]))
      // email: new FormControl('', Validators.compose([Validators.]))
    });
  }

  ngOnInit() {}

  login(credentials: userLogin) {
    console.log(credentials);
    this.authService
      .loginUser(credentials)
      .then((res) => {
        this.errorMessage = '';
        this.navCtrl.navigateForward('menu/home');
      })
      .catch((error) => {
        this.errorMessage = error;
        this.alertMessage(this.errorMessage);
      });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  async alertMessage(header: string, btn: string = 'ok') {
    const alert = await this.alertCtrl.create({
      header: header,
      buttons: [btn],
    });

    await alert.present();
  }
}
