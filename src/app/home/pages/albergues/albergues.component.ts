import {Component, OnInit, ViewChild} from '@angular/core';
import { DefensaService } from "../../services/defensa.service";
import { Albergues, Dato } from "../../../interfaces";
import {AlertController, IonModal} from "@ionic/angular";

@Component({
  selector: 'app-albergues',
  templateUrl: './albergues.component.html',
  styleUrls: ['./albergues.component.scss'],
})
export class AlberguesComponent implements OnInit {

  loading = false;
  albergues: Albergues = { exito: false, datos: [], mensaje: '' };
  filteredAlbergues: Dato[] = [];
  searchQuery = '';
  albergue!: Dato;
  @ViewChild(IonModal) modal!: IonModal;
  center!: google.maps.LatLngLiteral | google.maps.LatLng;


  constructor(
    public defensaService: DefensaService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.getAlbergues();
  }

  filterAlbergues() {
    this.filteredAlbergues = this.albergues.datos.filter((albergue) => {
      return albergue.ciudad.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        albergue.edificio.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }

  showAlbergueDetails(albergue: Dato) {
    this.albergue = albergue;
    this.center = {
      lat: Number(albergue.lat),
      lng: Number(albergue.lng)
    };
    this.modal.present();
  }

  closeModal() {
    this.modal.dismiss();
  }

  private showAlert(type: string, message: string) {
    this.alertController.create({
      header: type,
      message,
      buttons: ['OK']
    }).then(alert => alert.present());

  }

  handleRefresh($event: any) {
    this.getAlbergues();
    $event.target.complete();
  }

  private getAlbergues() {
    this.loading = true;
    this.defensaService.getAlbergues().then((data: Albergues) => {
      if (data.exito){
        this.albergues = data;
        this.filteredAlbergues = [...this.albergues.datos];
        this.loading = false;
      } else {
        this.showAlert('Error', data.mensaje);
        this.loading = false;
      }
    }).catch((error) => {
      this.showAlert('Error', 'No se pudo cargar los albergues');
      this.loading = false;
    });
  }
}
