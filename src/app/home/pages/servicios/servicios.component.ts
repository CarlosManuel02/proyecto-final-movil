import { Component, OnInit } from '@angular/core';
import {DefensaService} from "../../services/defensa.service";
import {Servicios} from "../../../interfaces";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
})
export class ServiciosComponent  implements OnInit {

  servicios!: Servicios;
  loading = false;
  constructor(
    public defensaService: DefensaService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.loading = true;
    this.defensaService.getServicios().then((data) => {
      if (data.exito) {
        this.servicios = data;
        this.loading = false;
      } else {
        this.showAlert('Error', data.mensaje);
        this.loading = false;
      }
    }).catch((error) => {
      this.showAlert('Error', 'Ocurrió un error al intentar cargar los servicios');
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
