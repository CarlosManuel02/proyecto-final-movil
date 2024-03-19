import { Component, OnInit } from '@angular/core';
import {DefensaService} from "../../services/defensa.service";
import {Servicios} from "../../../interfaces";

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
})
export class ServiciosComponent  implements OnInit {

  servicios!: Servicios;
  loading = false;
  constructor(
    public defensaService: DefensaService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.defensaService.getServicios().then((data) => {
      if (data.exito) {
        this.servicios = data;
        this.loading = false;
      } else {
        console.error(data.mensaje);
        this.loading = false;
      }
    }).catch((error) => {
      console.error(error);
      this.loading = false;
    });
  }

}
