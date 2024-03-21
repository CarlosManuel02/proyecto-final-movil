import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {LoginComponent} from "./pages/login/login.component";
import {MainComponent} from "./pages/main/main.component";
import {IonicModule} from "@ionic/angular";
import {RegisterComponent} from "./pages/register/register.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PerfilComponent} from "./pages/perfil/perfil.component";
import {GoogleMap, MapAdvancedMarker} from "@angular/google-maps";


@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    RegisterComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleMap,
    MapAdvancedMarker
  ]
})
export class AuthModule { }
