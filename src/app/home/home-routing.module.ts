import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import {HistoriaComponent} from "./pages/historia/historia.component";
import {ServiciosComponent} from "./pages/servicios/servicios.component";
import {NoticiasComponent} from "./pages/noticias/noticias.component";
import {VideosComponent} from "./pages/videos/videos.component";
import {AlberguesComponent} from "./pages/albergues/albergues.component";
import {MedidasComponent} from "./pages/medidas/medidas.component";
import {MiembrosComponent} from "./pages/miembros/miembros.component";
import {VoluntarioComponent} from "./pages/voluntario/voluntario.component";
import {AcercaDeComponent} from "./pages/acerca-de/acerca-de.component";
import {SituacionesComponent} from "./pages/situaciones/situaciones.component";
import {ValidarTokenGuard} from "../guards/validar-token.guard";

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'historia',
    component: HistoriaComponent
  },
  {
    path: 'servicios',
    component: ServiciosComponent
  },
  {
    path: 'noticias',
    component: NoticiasComponent
  },
  {
    path: 'videos',
    component: VideosComponent
  },
  {
    path: 'albergues',
    component: AlberguesComponent
  },
  {
    path: 'medidas',
    component: MedidasComponent
  },
  {
    path: 'miembros',
    component: MiembrosComponent
  },
  {
    path: 'voluntariado',
    component: VoluntarioComponent
  },
  {
    path: 'situaciones',
    component: SituacionesComponent,
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard]
  },
  {
    path: 'acerca-de',
    component: AcercaDeComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
