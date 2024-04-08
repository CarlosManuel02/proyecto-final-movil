import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AuthService, Login} from "../../services/auth.service";
import {AlertController, IonModal} from "@ionic/angular";

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
  themeToggle: boolean = false;

  get usuario(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  constructor(
    public authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    // console.log(this.usuario)
    if (localStorage.getItem('dark')) {
      this.initializeDarkTheme(JSON.parse(localStorage.getItem('dark') || 'false'));
      return;
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.initializeDarkTheme(prefersDark.matches);
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
  initializeDarkTheme(isDark: boolean) {
    this.themeToggle = isDark;
    this.toggleDarkTheme(isDark);
  }

  toggleChange(ev: { detail: { checked: boolean | undefined; }; }) {
    this.toggleDarkTheme(ev.detail.checked);
  }
  toggleDarkTheme(shouldAdd: boolean | undefined) {
    document.body.classList.toggle('dark', shouldAdd);
    localStorage.setItem('dark', JSON.stringify(shouldAdd));
  }
}
