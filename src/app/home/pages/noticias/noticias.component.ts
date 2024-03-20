import {Component, OnInit} from '@angular/core';
import {DefensaService} from "../../services/defensa.service";
import {Noticias} from "../../../interfaces";

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {

  noticias!: Noticias;
  loading = false

  constructor(
    public defenseService: DefensaService
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
          console.log('Error al obtener noticias');
        }
      })
  }

}
