import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slides = [
    {
      image: 'assets/slide1.jpg',
      title: 'Acción 1',
      description: 'Descripción de la acción 1 de la Defensa Civil.'
    },
    {
      image: 'assets/slide2.jpg',
      title: 'Acción 2',
      description: 'Descripción de la acción 2 de la Defensa Civil.'
    },
    {
      image: 'assets/slide3.jpg',
      title: 'Acción 3',
      description: 'Descripción de la acción 3 de la Defensa Civil.'
    }
  ];

  constructor() {}

}
