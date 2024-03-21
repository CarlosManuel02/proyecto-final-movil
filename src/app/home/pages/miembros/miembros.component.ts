import {Component, OnInit} from '@angular/core';
import {DefensaService} from "../../services/defensa.service";
import {Miembros} from "../../../interfaces";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-miembros',
  templateUrl: './miembros.component.html',
  styleUrls: ['./miembros.component.scss'],
})
export class MiembrosComponent implements OnInit {

  miembros!: Miembros;
  loading: boolean = false;

  constructor(
    public defensaService: DefensaService,
    private alertController: AlertController,
  ) {
  }

  ngOnInit() {
    this.loading = true;
    this.defensaService.getMiembros().then((data) => {
      if (data.exito) {
        this.miembros = data;
        this.loading = false;
      } else {
        this.showAlert('Error', data.mensaje);
        this.loading = false;
      }
    }).catch((error) => {
      this.showAlert('Error', 'Error al cargar los miembros');
      this.loading = false;
    });
  }

  private showAlert(type: string, message: string) {
    this.alertController.create({
      header: type,
      message,
      buttons: ['OK']
    }).then(alert => alert.present());

  }

}
