import {Component, OnInit} from '@angular/core';
import {Init} from "../../../shared/init";

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss'],
})
export class AjustesComponent implements OnInit {

  fonts = [
    "Roboto, sans-serif",
    "Arial, sans-serif",
    "Georgia, serif",
    "Times New Roman, serif",
    "Courier New, monospace",
    "Verdana, sans-serif",
    "Geneva, sans-serif",
    "Tahoma, sans-serif",
    "Trebuchet MS, sans-serif",
    "Impact, sans-serif",
    "Comic Sans MS, cursive",

  ]

  get themeToggle() {
    return this.init.themeToggle;
  }

  set themeToggle(value: boolean) {
    this.init.themeToggle = value;
  }

  get fontFamily() {
    return this.init.fontFamily;
  }

  set fontFamily(value: string) {
    this.init.fontFamily = value;
  }

  get fontSize() {
    return this.init.fontSize;
  }

  set fontSize(value: number) {
    this.init.fontSize = value;
  }

  constructor(private init: Init) {
  }

  ngOnInit() {
    this.init.getTheme();
    this.init.getFont();
  }


  toggleChange(ev: { detail: { checked: boolean | undefined; }; }) {
    this.init.toggleDarkTheme(ev.detail.checked);
  }

  fontChange($event: any) {
    this.init.fontChange($event);
  }

  fontSizeChange($event: any) {
    this.init.fontSizeChange($event);
  }

}
