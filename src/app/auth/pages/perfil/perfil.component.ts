import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService, Login} from "../../services/auth.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent  implements OnInit {

  get usuario(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    console.log(this.usuario)
  }

  logout() {
    this.authService.logout();
  }

  resetPassword() {

  }
}
