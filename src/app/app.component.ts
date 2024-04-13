import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./auth/services/auth.service";
import {Init} from "./shared/init";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {

  appPages: { title: string; url: string; icon: string }[] = [
    {title: 'Inicio', url: '', icon: 'home'},
    {title: 'Historia', url: '/historia', icon: 'book'},
    {title: 'Servicios', url: '/servicios', icon: 'construct'},
    {title: 'Noticias', url: '/noticias', icon: 'newspaper'},
    {title: 'Videos', url: '/videos', icon: 'videocam'},
    {title: 'Albergues', url: '/albergues', icon: 'home'},
    {title: 'Medidas Preventivas', url: '/medidas', icon: 'warning'},
    {title: 'Situaciones', url: '/situaciones', icon: 'gift'},
    {title: 'Miembros', url: '/miembros', icon: 'people'},
    {title: 'Acerca de', url: '/acerca-de', icon: 'information-circle'},
  ];
  isLogged: boolean = false;
  themeToggle = false;

  constructor(
    public router: Router,
    public authService: AuthService,
    private init: Init
  ) {
  }

  ngAfterViewInit(): void {
    this.isLogged = this.authService.isLogged();
    this.init.getTheme();
  }


  login() {
    this.router.navigate(['../auth']);
  }

  ngOnInit(): void {
    this.isLogged = this.authService.isLogged();
    this.init.getTheme();
    this.init.getFont();
  }

  goToProfile() {
    this.router.navigate(['../auth/perfil']);
  }



}

