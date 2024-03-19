import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import {HistoriaComponent} from "./pages/historia/historia.component";

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'historia',
    component: HistoriaComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
