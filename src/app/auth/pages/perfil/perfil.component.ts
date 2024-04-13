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
  fonts = [
    "Roboto, sans-serif",
    "Arial, sans-serif",
    "Georgia, serif",
    "Times New Roman, serif",
    "Courier New, monospace",
    "Verdana, sans-serif",
    "Geneva, sans-serif",
    "Tahoma, sans-serif",
    "Trebuchet MS, sans-serif",
    "Impact, sans-serif",
    "Comic Sans MS, cursive",

  ]
  cedula!: string;
  correo!: string;
  nuevoContrasena!: string;

  get themeToggle() {
    return this.init.themeToggle;
  }

  set themeToggle(value: boolean) {
    this.init.themeToggle = value;
  }

  get fontFamily() {
    return this.init.fontFamily;
  }

  set fontFamily(value: string) {
    this.init.fontFamily = value;
  }

  get fontSize() {
    return this.init.fontSize;
  }

  set fontSize(value: number) {
    this.init.fontSize = value;
  }

  get usuario(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  constructor(
    public authService: AuthService,
    private init: Init,
  ) {
  }

  ngOnInit(): void {
    this.init.getTheme();
    this.init.getFont();
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

  toggleChange(ev: { detail: { checked: boolean | undefined; }; }) {
    this.init.toggleDarkTheme(ev.detail.checked);
  }

  fontChange($event: any) {
    this.init.fontChange($event);
  }

  fontSizeChange($event: any) {
    this.init.fontSizeChange($event);
  }
}
