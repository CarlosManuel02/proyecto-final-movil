import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {AlertController, IonModal} from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  loginform = this.fb.group({
    cedula: ['', [Validators.required, Validators.minLength(10)]],
    clave: ['', [Validators.required, Validators.minLength(4)]]
  });
  cedula!: string;
  correo!: string;
  nuevoContrasena!: string;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public authService: AuthService,
    private alertController: AlertController
  ) {
  }

  ngOnInit() {
  }

  login() {
    const {cedula, clave} = this.loginform.value;
    if (cedula != null && clave != null) {

      this.authService.login(cedula, clave)
        .subscribe((resp) => {
          if (resp) {
            this.router.navigate(['../home']);
            // console.log(resp)
          } else {
            console.log('Error')
            this.showAlert('Error', 'Cédula o clave incorrecta');
          }
        });
    }

  }

  private showAlert(type: string, message: string) {
    this.alertController.create({
      header: type,
      message,
      buttons: ['OK']
    }).then(alert => alert.present());

  }
  openModal() {
    this.modal.present();
  }

  closeModal() {
    this.modal.dismiss();
  }
  resetPassword() {
    this.authService.resetPassword(this.correo, this.cedula)
      .subscribe((resp) => {
        if (resp.exito) {
          // Utilizamos expresión regular para extraer la nueva contraseña del mensaje
          const regex = /la nueva clave es (\d+)/;
          const match = resp.mensaje.match(regex);
          if (match) {
            this.nuevoContrasena = match[1]; // La contraseña se encuentra en el primer grupo capturado
          } else {
            console.log('No se pudo extraer la nueva contraseña del mensaje');
          }
        } else {
          console.log(resp.mensaje)
        }
      });


  }

}
