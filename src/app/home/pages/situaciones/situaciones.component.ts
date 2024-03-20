import {Component, OnInit, ViewChild} from '@angular/core';
import {DefensaService} from "../../services/defensa.service";
import {DatoSituaciones, Situaciones} from "../../../interfaces";
import {IonModal} from "@ionic/angular";

@Component({
  selector: 'app-situaciones',
  templateUrl: './situaciones.component.html',
  styleUrls: ['./situaciones.component.scss'],
})
export class SituacionesComponent implements OnInit {

  loading = false;
  situaciones!: Situaciones;
  situacion!: DatoSituaciones;
  center!: google.maps.LatLngLiteral | google.maps.LatLng;
  @ViewChild(IonModal) modal!: IonModal;


  constructor(
    public defensaService: DefensaService,
  ) {
  }

  ngOnInit() {
    this.loading = true;
    this.defensaService.getSituaciones()
      .then((data: Situaciones) => {
        if (data.exito) {
          this.situaciones = data;
          this.loading = false;
        } else {
          this.loading = false;
          console.log(data.mensaje);
        }
      });
  }

  openSituacion(situacion: DatoSituaciones) {
    this.modal.present();
    this.center = {
      lat: parseFloat(situacion.latitud),
      lng: parseFloat(situacion.longitud)
    };
    this.situacion = situacion;
  }

  closeModal() {
    this.modal.dismiss();
  }

  openModal() {
  //   TODO: Crear nueva situacion

  }
}
