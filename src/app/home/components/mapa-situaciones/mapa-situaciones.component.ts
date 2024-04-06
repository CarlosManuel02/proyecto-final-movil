import {Component, Input, OnInit} from '@angular/core';
import {DatoSituaciones} from "../../../interfaces";
import {Geolocation} from "@capacitor/geolocation";

@Component({
  selector: 'app-mapa-situaciones',
  templateUrl: './mapa-situaciones.component.html',
  styleUrls: ['./mapa-situaciones.component.scss'],
})
export class MapaSituacionesComponent  implements OnInit {
  @Input() situaciones: DatoSituaciones[] | undefined;

  constructor() { }
  situacionesUbicacion: any[] = [];
  center!: google.maps.LatLngLiteral | google.maps.LatLng;
  options: google.maps.MapOptions ={
    fullscreenControl: true,
    zoomControl: true,
  }

  ngOnInit() {
    this.obtenerUbicacionActual();

    this.situaciones?.forEach((situacion) => {
      this.situacionesUbicacion.push({
        lat: parseFloat(situacion.latitud),
        lng: parseFloat(situacion.longitud),
        title: situacion.descripcion
      });
    });
    console.log(this.situacionesUbicacion)
  }


  async obtenerUbicacionActual() {
    const permisos = await Geolocation.requestPermissions();

    if (permisos && permisos.location === 'granted') {
      const posicion = await Geolocation.getCurrentPosition();
      this.center = {lat: posicion.coords.latitude, lng: posicion.coords.longitude};
    } else {
      // this.showAlert('Error', 'No se han otorgado los permisos para acceder a la ubicación');
    }
  }

}
