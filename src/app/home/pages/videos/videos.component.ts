import {Component, OnInit} from '@angular/core';
import {DefensaService} from "../../services/defensa.service";
import {Videos} from "../../../interfaces";

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit {

  videos!: Videos;

  constructor(
    public defensaService: DefensaService,
  ) {
  }

  ngOnInit() {
    this.defensaService.getVideos()
      .then((data) => {
        if (data.exito) {
          this.videos = data;
        } else {
          console.error(data.mensaje);
        }
      })
  }

}
