import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; //Se agrega para tener las peticiones http *

//Este modulo permite enlazar el formulario con los datos capturados
import {FormsModule} from '@angular/forms'; 

import { ProfesoresService } from './services/profesores.service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AlumnosListComponent } from './components/alumnos-list/alumnos-list.component';
import { AlumnosFormComponent } from './components/alumnos-form/alumnos-form.component';
import { AlumnosService } from './services/alumnos.service';
import { ProfesorComponent } from './components/profesor/profesor.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavigationComponent,
    AlumnosListComponent,
    AlumnosFormComponent,
    ProfesorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule //Para enlazar el formulario
  ],
  providers: [ //Aqui se le dice que esta app tendra los siguientes provedores de servicios
    ProfesoresService,
    AlumnosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
