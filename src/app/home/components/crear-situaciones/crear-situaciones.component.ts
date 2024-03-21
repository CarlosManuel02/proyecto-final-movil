import {Component, OnInit, ViewChild} from '@angular/core';
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import { Geolocation } from '@capacitor/geolocation';
import {FormBuilder} from "@angular/forms";
import {IonModal} from "@ionic/angular";

@Component({
  selector: 'app-crear-situaciones',
  templateUrl: './crear-situaciones.component.html',
  styleUrls: ['./crear-situaciones.component.scss'],
})
export class CrearSituacionesComponent implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;

  form = this.fb.group({
    titulo: [''],
    descripcion: [''],
    ubicacion: [''],
    foto: ['']
  })
  center: google.maps.LatLngLiteral | google.maps.LatLng = {lat: 0, lng: 0};
  position!: google.maps.LatLngLiteral;
  mapOptions: google.maps.MapOptions = {
    center: this.center,
    zoom: 15,
  }
  constructor(
    public fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.obtenerUbicacionActual();
  }

  async obtenerUbicacionActual() {
    // Solicitar permisos para acceder a la ubicación
    const permisos = await Geolocation.requestPermissions();

    if (permisos && permisos.location === 'granted') {
      // Obtener la ubicación actual del dispositivo
      const posicion = await Geolocation.getCurrentPosition();
      this.center = {lat: posicion.coords.latitude, lng: posicion.coords.longitude};
      console.log('Ubicación actual:', posicion.coords.latitude, posicion.coords.longitude);
    } else {
      console.log('Permiso denegado para acceder a la ubicación.');
    }
  }


  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      saveToGallery: true
    });
    const imageUrl = image.base64String;
    this.form.patchValue({foto: imageUrl});
  };

  saveData() {

  }

  openMap() {
    this.modal.present();
  }

  setLocation($event: any) {
    console.log($event?.latLng.toJSON());
  }

  closeModal() {
    this.modal.dismiss();
  }

  setMarker($event: any) {
    this.position = $event?.latLng?.toJSON();
    console.log(this.position)


  }
}
