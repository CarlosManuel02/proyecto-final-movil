import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  appPages: { title: string; url: string; icon: string }[] = [
    { title: 'Inicio', url: '', icon: 'home' },
    { title: 'Historia', url: '/historia', icon: 'book' },
    { title: 'Servicios', url: '/servicios', icon: 'construct' },
    { title: 'Noticias', url: '/noticias', icon: 'newspaper' },
    { title: 'Videos', url: '/videos', icon: 'videocam' },
    { title: 'Albergues', url: '/albergues', icon: 'home' },
    { title: 'Medidas Preventivas', url: '/medidas', icon: 'warning' },
    { title: 'Situaciones', url: '/situaciones', icon: 'gift' },
    { title: 'Miembros', url: '/miembros', icon: 'people' },
    { title: 'Quiero ser Voluntario', url: '/voluntariado', icon: 'hand-left' },
    { title: 'Acerca de', url: '/acerca-de', icon: 'information-circle' },
  ];
  constructor() {}
}
