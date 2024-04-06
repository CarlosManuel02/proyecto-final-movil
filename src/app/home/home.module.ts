import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {HistoriaComponent} from "./pages/historia/historia.component";
import {ServiciosComponent} from "./pages/servicios/servicios.component";
import {AcercaDeComponent} from "./pages/acerca-de/acerca-de.component";
import {AlberguesComponent} from "./pages/albergues/albergues.component";
import {MiembrosComponent} from "./pages/miembros/miembros.component";
import {NoticiasComponent} from "./pages/noticias/noticias.component";
import {VideosComponent} from "./pages/videos/videos.component";
import {MedidasComponent} from "./pages/medidas/medidas.component";
import {SituacionesComponent} from "./pages/situaciones/situaciones.component";
import {GoogleMap, MapAdvancedMarker, MapMarker} from "@angular/google-maps";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {CrearSituacionesComponent} from "./components/crear-situaciones/crear-situaciones.component";
import {MapaSituacionesComponent} from "./components/mapa-situaciones/mapa-situaciones.component";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    GoogleMap,
    MapMarker,
    MapAdvancedMarker,
    SlickCarouselModule,
    FormsModule,
  ],
  declarations: [
    HomePage,
    HistoriaComponent,
    ServiciosComponent,
    AcercaDeComponent,
    AlberguesComponent,
    MiembrosComponent,
    NoticiasComponent,
    ServiciosComponent,
    VideosComponent,
    MedidasComponent,
    SituacionesComponent,
    CrearSituacionesComponent,
    MapaSituacionesComponent

  ]
})
export class HomePageModule {}
