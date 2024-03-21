import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {Router} from "@angular/router";

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

  private _user!: Login;
  get user(): Datos {
    return {...this._user?.datos};
  }

  private url = 'https://adamix.net/defensa_civil/def/';

  get token() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).token : '';
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const user = localStorage.getItem('user');
    if (user) {
      this._user = JSON.parse(user);
      console.log(this._user)
    } else {
      this._user = {
        exito: false,
        datos: {
          id: '',
          nombre: '',
          apellido: '',
          correo: '',
          telefono: '',
          token: ''
        },
        mensaje: ''
      }
    }
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
              this.setUserData(resp);
              return resp.exito;
            } else {
              localStorage.removeItem('user');
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
    localStorage.removeItem('user');
    this._user = {
      exito: false,
      datos: {
        id: '',
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        token: ''
      },
      mensaje: ''
    }
    this.router.navigate(['../auth']);
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
              this._user = resp;
              localStorage.setItem('user', JSON.stringify(resp.datos));
              return resp.exito;
            } else {
              localStorage.removeItem('user');
              throw new Error(resp.mensaje);
            }
          }
        ),
        tap((resp) => {
          resp
        }),
      );
  }

  setUserData(resp: Login) {
    localStorage.setItem('user', JSON.stringify(resp.datos));
    this._user = resp;
  }


  isLogged(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return !!user.token;
  }

  resetPassword(correo: string, cedula: string) {
    const url = `${this.url}recuperar_clave.php`;
    const body: FormData = new FormData();
    body.append('correo', correo);
    body.append('cedula', cedula);
    return this.http.post<Login>(url, body)
      .pipe(
        map((resp: Login) => {
            if (resp.exito) {
              return resp;
            } else {
              throw new Error(resp.mensaje);
            }
          }
        ),
        tap((resp) => {
          resp
        }),
      );

    // console.log(email)
  }
}
