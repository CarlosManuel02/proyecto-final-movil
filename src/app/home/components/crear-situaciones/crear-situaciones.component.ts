import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {Geolocation} from '@capacitor/geolocation';
import {FormBuilder} from "@angular/forms";
import {AlertController, IonModal} from "@ionic/angular";
import {DefensaService} from "../../services/defensa.service";

@Component({
  selector: 'app-crear-situaciones',
  templateUrl: './crear-situaciones.component.html',
  styleUrls: ['./crear-situaciones.component.scss'],
})
export class CrearSituacionesComponent implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;

  @Output() close = new EventEmitter();

  form = this.fb.group({
    titulo: [''],
    descripcion: [''],
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
    public defensaService: DefensaService,
    private alertController: AlertController
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
      this.mapOptions = {
        center: this.center,
        zoom: 15,
      }
    } else {
      this.showAlert('Error', 'No se han otorgado los permisos para acceder a la ubicación');
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
    const {titulo, descripcion, foto} = this.form.value;
    // console.log(this.position)
    if (!titulo || !descripcion || !this.position || !foto) {
      this.showAlert('Error', 'Todos los campos son requeridos');
      return;
    }
    this.defensaService.saveSituacion(titulo, descripcion, this.position, foto)
      .then((data: any) => {
          if (data.exito) {
            this.showAlert('Exito', 'Situación guardada correctamente');
            this.form.reset();
            this.close.emit();
          } else {
            this.showAlert('Error', data.mensaje);
          }
        }
      ), () => {
      this.showAlert('Error', 'Ha ocurrido un error al guardar la situación');
    }
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

  private showAlert(type: string, message: string) {
    this.alertController.create({
      header: type,
      message,
      buttons: ['OK']
    }).then(alert => alert.present());

  }
}
