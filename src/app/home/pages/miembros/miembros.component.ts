import {Component, OnInit} from '@angular/core';
import {DefensaService} from "../../services/defensa.service";
import {Miembros} from "../../../interfaces";

@Component({
  selector: 'app-miembros',
  templateUrl: './miembros.component.html',
  styleUrls: ['./miembros.component.scss'],
})
export class MiembrosComponent implements OnInit {

  miembros!: Miembros;
  loading: boolean = false;

  constructor(
    public defensaService: DefensaService
  ) {
  }

  ngOnInit() {
    this.loading = true;
    this.defensaService.getMiembros().then((data) => {
      if (data.exito) {
        this.miembros = data;
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
