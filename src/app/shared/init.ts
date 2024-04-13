import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Init {


  fontFamily!: string;
  fontSize!: number;
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
      this.fontChange({detail: {value: this.fontFamily}})
      this.getFontSize();
      return;
    }
    this.fontFamily = 'Roboto, sans-serif';
    this.getFontSize();
    document.documentElement.style.setProperty('--ion-font-family', this.fontFamily);
  }

  fontChange($event: any) {
    this.fontFamily = $event.detail.value;
    document.documentElement.style.setProperty('--ion-font-family', this.fontFamily);
    localStorage.setItem('font', JSON.stringify(this.fontFamily));
  }

  getFontSize() {
    if (localStorage.getItem('fontSize')) {
      this.fontSize = JSON.parse(localStorage.getItem('fontSize') || '16');
      this.fontSizeChange({detail: {value: this.fontSize}})
      return;
    }
    this.fontSize = 16;
    document.documentElement.style.setProperty('--ion-font-size', this.fontSize + 'px');
  }

  fontSizeChange($event: any) {
    this.fontSize = $event.detail.value;
    document.documentElement.style.fontSize = this.fontSize + 'px';
    localStorage.setItem('fontSize', JSON.stringify(this.fontSize));
  }


}
