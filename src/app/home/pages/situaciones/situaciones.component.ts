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
  situaciones!: Situaciones | null;
  situacion!: DatoSituaciones;
  center!: google.maps.LatLngLiteral | google.maps.LatLng;
  @ViewChild('detallesSituacion') detallesModal!: IonModal;
  @ViewChild('nuevaSituacionModal') nuevaSituacionModal!: IonModal;
  @ViewChild('mapModal') mapModal!: IonModal;


  constructor(
    public defensaService: DefensaService,
    public fb: FormBuilder,
    public alertController: AlertController
  ) {
  }

  ngOnInit() {
    this.getSituaciones();
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
    this.mapModal.dismiss();
  }

  openModal() {
    //   TODO: Crear nueva situacion
    this.nuevaSituacionModal.present();

  }

  refresh() {
    this.getSituaciones();
  }

  getSituaciones() {
    this.loading = true;
    this.situaciones = null;
    this.defensaService.getSituaciones()
      .then((data: Situaciones) => {
        if (data.exito) {
          this.situaciones = data;
          this.loading = false;
        } else {
          this.loading = false;
          this.showAlert('Error', data.mensaje);
        }
      });
  }

  private showAlert(type: string, message: string) {
    this.alertController.create({
      header: type,
      message,
      buttons: ['OK']
    }).then(alert => alert.present());

  }

  openMap() {
    this.mapModal.present();
  }

  handleRefresh($event: any) {
    this.getSituaciones();
    $event.target.complete();
  }
}
