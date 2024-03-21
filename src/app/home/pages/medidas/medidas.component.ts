import {Component, OnInit, ViewChild} from '@angular/core';
import {DefensaService} from "../../services/defensa.service";
import {Datomedida, Medidas} from "../../../interfaces";
import {AlertController, IonModal} from "@ionic/angular";

@Component({
  selector: 'app-medidas',
  templateUrl: './medidas.component.html',
  styleUrls: ['./medidas.component.scss'],
})
export class MedidasComponent implements OnInit {

  loading = false;
  medidas!: Medidas;
  medida!: Datomedida;
  @ViewChild(IonModal) modal!: IonModal;

  constructor(
    public defensaService: DefensaService,
    private alertController: AlertController,

  ) {
  }

  ngOnInit() {
    this.loading = true;
    this.defensaService.getMedidas()
      .then((data) => {
        if (data.exito) {
          this.medidas = data;
          this.loading = false;
        } else {
          this.showAlert('Error', data.mensaje);
          this.loading = false;
          console.log(data)
        }
      });
  }

  openModal(medida: Datomedida) {
    this.medida = medida;
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
}
