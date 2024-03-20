import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Servicios, Videos, Noticias, Albergues, Medidas, Miembros, Situaciones} from "../../interfaces";
import {AuthService} from "../../auth/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class DefensaService {

  private url = 'https://adamix.net/defensa_civil/def/';

  constructor(
    public http: HttpClient,
    public auth: AuthService
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

  getMedidas(): Promise<Medidas> {
    const path = this.url + 'medidas_preventivas.php';
    return new Promise((resolve, reject) => {
      this.http.get<Medidas>(path).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  getMiembros(): Promise<Miembros> {
    const path = this.url + 'miembros.php';
    return new Promise((resolve, reject) => {
      this.http.get<Miembros>(path).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  getSituaciones() : Promise<Situaciones> {
    const path = this.url + 'situaciones.php';
    const body: FormData = new FormData();
    body.append('token', this.auth.token);
    return new Promise((resolve, reject) => {
      this.http.post<Situaciones>(path, body).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });

  }
}
