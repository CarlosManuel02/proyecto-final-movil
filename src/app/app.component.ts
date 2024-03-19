import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  appPages: { title: string; url: string; icon: string }[] = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Historia', url: '/historia', icon: 'book' },
    { title: 'Servicios', url: '/services', icon: 'construct' },
    { title: 'Noticias', url: '/news', icon: 'newspaper' },
    { title: 'Videos', url: '/videos', icon: 'videocam' },
    { title: 'Albergues', url: '/shelters', icon: 'home' },
    { title: 'Mapa de Albergues', url: '/shelters-map', icon: 'map' },
    { title: 'Medidas Preventivas', url: '/prevention', icon: 'warning' },
    { title: 'Miembros', url: '/members', icon: 'people' },
    { title: 'Quiero ser Voluntario', url: '/volunteer', icon: 'hand-left' },
    { title: 'Acerca de', url: '/about', icon: 'information-circle' },
  ];
  constructor() {}
}
