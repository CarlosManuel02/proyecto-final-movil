import {Component, OnInit} from '@angular/core';
import {DefensaService} from "../../services/defensa.service";
import {Noticias} from "../../../interfaces";
import {AlertController} from "@ionic/angular";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {

  noticias!: Noticias;
  noticiasEspecificas!: Noticias;
  loading = false
  segment = 'all';

  get token() {
    return this.authService.token;
  }

  constructor(
    public defenseService: DefensaService,
    private authService: AuthService,
    public alertController: AlertController
  ) {
  }

  ngOnInit() {
    this.fetchAll();
  }

  private showAlert(type: string, message: string) {
    this.alertController.create({
      header: type,
      message,
      buttons: ['OK']
    }).then(alert => alert.present());

  }

  private fetchNoticias() {
    this.loading = true;
    this.defenseService.getNoticias()
      .then((data) => {
        if (data.exito) {
          this.loading = false;
          this.noticias = data;
        } else {
          this.loading = false;
          this.showAlert('Error', 'No se pudo obtener las noticias');
        }
      })
  }

  private fechaNoticiasEspecificas() {
    this.loading = true;
    this.defenseService.getNoticiasEspecificas(this.token)
      .then((data) => {
        if (data.exito) {
          this.noticiasEspecificas = data;
          this.loading = false;
        } else {
          this.loading = false;
          console.log(data)
          this.showAlert('Error', 'No se pudo obtener las noticsias');
        }
      })
  }

  segmentChanged($event: any) {
    this.segment = $event.detail.value;
  }

  handleRefresh($event: any) {
    this.fetchAll();
    $event.target.complete();
  }

  private fetchAll() {
    this.fetchNoticias();
    if (this.authService.token) {
      this.fechaNoticiasEspecificas();
    }
  }
}
