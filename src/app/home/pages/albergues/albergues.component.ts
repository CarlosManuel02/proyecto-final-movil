import {Component, OnInit, ViewChild} from '@angular/core';
import { DefensaService } from "../../services/defensa.service";
import { Albergues, Dato } from "../../../interfaces";
import {IonModal} from "@ionic/angular";

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
  ) { }

  ngOnInit() {
    this.loading = true;
    this.defensaService.getAlbergues().then((data: Albergues) => {
      this.albergues = data;
      this.filteredAlbergues = [...this.albergues.datos];
      this.loading = false;
    }).catch((error) => {
      console.error(error);
      this.loading = false;
    });
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
}
