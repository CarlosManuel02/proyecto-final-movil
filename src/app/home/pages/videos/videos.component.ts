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
  loading = false

  constructor(
    public defensaService: DefensaService,
  ) {
  }

  ngOnInit() {
    this.getVideos()
  }

  handleRefresh($event: any) {
    this.getVideos()
    $event.target.complete();
  }

  private getVideos() {
    this.loading = true;
    this.defensaService.getVideos()
      .then((data) => {
        if (data.exito) {
          this.loading = false;
          this.videos = data;
        } else {
          console.error(data.mensaje);
          this.loading = false;
        }
      })
  }
}
