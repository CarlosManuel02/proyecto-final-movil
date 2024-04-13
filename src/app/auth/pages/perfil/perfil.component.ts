import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AuthService, Login} from "../../services/auth.service";
import {AlertController, IonModal} from "@ionic/angular";
import {Init} from "../../../shared/init";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        return ''
      },
    },
    {
      text: 'Logout',
      role: 'logout',
      handler: () => {
        this.logout();
      },
    },
  ];

  cedula!: string;
  correo!: string;
  nuevoContrasena!: string;

  get usuario(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  constructor(
    public authService: AuthService,
    private init: Init,
  ) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
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

  openModal() {
    this.modal.present();
  }

  closeModal() {
    this.modal.dismiss();
  }

}
