import {Component, OnInit} from '@angular/core';
import {DefensaService} from "../../services/defensa.service";
import {Noticias} from "../../../interfaces";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {

  noticias!: Noticias;
  loading = false

  constructor(
    public defenseService: DefensaService,
    public alertController: AlertController
  ) {
  }

  ngOnInit() {
    this.loading = true;
    this.defenseService.getNoticias()
      .then((data) => {
        if (data.exito) {
          this.loading = false;
          this.noticias = data;
        } else {
          this.loading = false;
          this.showAlert('Error', 'No se pudo obtener las noticias');
        }
      })
  }

  private showAlert(type: string, message: string) {
    this.alertController.create({
      header: type,
      message,
      buttons: ['OK']
    }).then(alert => alert.present());

  }

}
