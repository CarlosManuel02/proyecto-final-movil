import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";

export interface Login {
  exito: boolean;
  datos: Datos;
  mensaje: string;
}

export interface Datos {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  token: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user!: Login;
  private url = 'https://adamix.net/defensa_civil/def/';

  get token(): string {
    return JSON.parse(localStorage.getItem('token') || '{}');
  }
  constructor(
    private http: HttpClient
  ) {
  }

  login(cedula: string, password: string) {
    const url = `${this.url}iniciar_sesion.php`;
    const body: FormData = new FormData();
    body.append('cedula', cedula);
    body.append('clave', password);

    return this.http.post<Login>(url, body)
      .pipe(
        map((resp: Login) => {
            if (resp.exito) {
              this.user = resp;
              localStorage.setItem('token', JSON.stringify(resp.datos.token));
              return resp.exito;
            } else {
              localStorage.removeItem('token');
              throw new Error(resp.mensaje);
            }
          }
        ),
        tap((resp) => {
          resp
        }),
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  register(nombre: string, apellido: string, cedula: string, correo: string, telefono: string, clave: string) {
    const url = `${this.url}registro.php`;
    const body: FormData = new FormData();
    body.append('nombre', nombre);
    body.append('apellido', apellido);
    body.append('cedula', cedula);
    body.append('correo', correo);
    body.append('telefono', telefono);
    body.append('clave', clave);

    return this.http.post<Login>(url, body)
      .pipe(
        map((resp: Login) => {
            if (resp.exito) {
              this.user = resp;
              localStorage.setItem('token', JSON.stringify(resp.datos.token));
              return resp.exito;
            } else {
              localStorage.removeItem('token');
              throw new Error(resp.mensaje);
            }
          }
        ),
        tap((resp) => {
          resp
        }),
      );
  }

  isLogged(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
