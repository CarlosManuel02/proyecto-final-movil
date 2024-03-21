import {Component, OnInit, ViewChild} from '@angular/core';
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {FormBuilder} from "@angular/forms";
import {IonModal} from "@ionic/angular";

@Component({
  selector: 'app-crear-situaciones',
  templateUrl: './crear-situaciones.component.html',
  styleUrls: ['./crear-situaciones.component.scss'],
})
export class CrearSituacionesComponent  implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;

  form = this.fb.group({
    titulo: [''],
    descripcion: [''],
    ubicacion: [''],
    foto: ['']
  })
  center: google.maps.LatLngLiteral | google.maps.LatLng = {lat: 0, lng: 0};
  position!: google.maps.LatLngLiteral | google.maps.LatLng;

  constructor(
    public fb: FormBuilder,
  ) { }

  ngOnInit() {}


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

  setMarker($event: google.maps.MapMouseEvent | google.maps.IconMouseEvent) {


  }
}
