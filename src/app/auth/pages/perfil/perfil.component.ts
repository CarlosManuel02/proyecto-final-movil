import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService, Login} from "../../services/auth.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent  implements AfterViewInit {

  get usuario() {
    return this.authService.user;
  }

  constructor(
    public authService: AuthService,
  ) { }

  ngAfterViewInit() {
    console.log(this.usuario)
  }

  logout() {
    this.authService.logout();
  }

}
