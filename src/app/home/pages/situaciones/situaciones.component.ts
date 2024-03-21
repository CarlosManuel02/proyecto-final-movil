import {Component, OnInit, ViewChild} from '@angular/core';
import {DefensaService} from "../../services/defensa.service";
import {DatoSituaciones, Situaciones} from "../../../interfaces";
import {AlertController, IonModal} from "@ionic/angular";
import {FormBuilder} from "@angular/forms";

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
  @ViewChild('detallesSituacion') detallesModal!: IonModal;
  @ViewChild('nuevaSituacionModal') nuevaSituacionModal!: IonModal;


  constructor(
    public defensaService: DefensaService,
    public fb: FormBuilder,
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
    this.detallesModal.present();
    this.center = {
      lat: parseFloat(situacion.latitud),
      lng: parseFloat(situacion.longitud)
    };
    this.situacion = situacion;
  }

  closeModal() {
    this.detallesModal.dismiss();
    this.nuevaSituacionModal.dismiss();
  }

  openModal() {
  //   TODO: Crear nueva situacion
    this.nuevaSituacionModal.present();

  }
}
