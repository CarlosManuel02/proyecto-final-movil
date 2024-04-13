import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Init {


  fontFamily!: string;
  themeToggle: boolean = false;


  getTheme() {
    if (localStorage.getItem('dark')) {
      this.initializeDarkTheme(JSON.parse(localStorage.getItem('dark') || 'false'));
      return;
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.initializeDarkTheme(prefersDark.matches);
  }

  initializeDarkTheme(isDark: boolean) {
    this.themeToggle = isDark;
    this.toggleDarkTheme(isDark);
  }

  toggleDarkTheme(shouldAdd: boolean | undefined) {
    document.body.classList.toggle('dark', shouldAdd);
    localStorage.setItem('dark', JSON.stringify(shouldAdd));
  }


  getFont() {
    if (localStorage.getItem('font')) {
      this.fontFamily = JSON.parse(localStorage.getItem('font') || 'false');
      document.documentElement.style.setProperty('--ion-font-family', this.fontFamily);
      return;
    }
    this.fontFamily = 'Roboto, sans-serif';
    document.documentElement.style.setProperty('--ion-font-family', this.fontFamily);
  }

  fontChange($event: any) {
    this.fontFamily = $event.detail.value;
    document.documentElement.style.setProperty('--ion-dynamic-font', this.fontFamily);
    localStorage.setItem('font', JSON.stringify(this.fontFamily));
  }

}
