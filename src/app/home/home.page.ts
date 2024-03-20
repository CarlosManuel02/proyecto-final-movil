import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slides = [
    {
      image: '/slide1.png',
      title: 'Respuesta a emergencias',
      description: 'La Defensa Civil actúa con rapidez y eficacia para proteger a las personas durante desastres naturales y otras emergencias.'
    },
    {
      image: '/slide2.png',
      title: 'Búsqueda y rescate',
      description: 'La Defensa Civil cuenta con personal altamente capacitado para encontrar y rescatar a personas en situaciones de peligro.'
    },
    {
      image: '/slide3.png',
      title: 'Capacitación y educación',
      description: 'La Defensa Civil ofrece programas de capacitación para preparar a la población ante situaciones de emergencia.'
    },
    {
      image: '/slide4.png',
      title: 'Prevención y mitigación',
      description: 'La Defensa Civil trabaja para reducir el riesgo de desastres mediante la implementación de medidas de prevención y mitigación.'
    },
    {
      image: '/slide5.png',
      title: 'Voluntariado',
      description: 'La Defensa Civil cuenta con una amplia red de voluntarios que apoyan en las labores de emergencia y prevención.'
    }
  ];

  actionCall = {
    text: '¡Únete a la Defensa Civil!',
    link: 'https://defensacivil.gob.do/index.php/contacto/itemlist/category/1-sobre-nosotros'
  };

  constructor() { }

}
