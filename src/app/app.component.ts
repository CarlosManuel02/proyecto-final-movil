import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./auth/services/auth.service";

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
    public authService: AuthService
  ) {
  }

  ngAfterViewInit(): void {
    this.isLogged = this.authService.isLogged();
  }


  login() {
    this.router.navigate(['../auth']);
  }

  ngOnInit(): void {
    this.isLogged = this.authService.isLogged();
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize the dark theme based on the initial
    // value of the prefers-color-scheme media query
    this.initializeDarkTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkTheme(mediaQuery.matches));
  }

  goToProfile() {
    this.router.navigate(['../auth/perfil']);
  }

  initializeDarkTheme(isDark: boolean) {
    this.themeToggle = isDark;
    this.toggleDarkTheme(isDark);
  }


  // Add or remove the "dark" class on the document body
  toggleDarkTheme(shouldAdd: boolean | undefined) {
    document.body.classList.toggle('dark', shouldAdd);
  }

}

