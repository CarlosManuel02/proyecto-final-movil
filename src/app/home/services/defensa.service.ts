import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Servicios, Videos, Noticias, Albergues} from "../../interfaces";

@Injectable({
  providedIn: 'root'
})
export class DefensaService {

  private url = 'https://adamix.net/defensa_civil/def/';

  constructor(
    public http: HttpClient
  ) {
  }

  getServicios(): Promise<Servicios> {
    const path = this.url + 'servicios.php';
    return new Promise((resolve, reject) => {
      this.http.get<Servicios>(path).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  getVideos(): Promise<Videos> {
    const path = this.url + 'videos.php';
    return new Promise((resolve, reject) => {
      this.http.get<Videos>(path).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  getNoticias(): Promise<Noticias> {
    const path = this.url + 'noticias.php';
    return new Promise((resolve, reject) => {
      this.http.get<Noticias>(path).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  getAlbergues(): Promise<Albergues> {
    const path = this.url + 'albergues.php';
    return new Promise((resolve, reject) => {
      this.http.get<Albergues>(path).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
}
