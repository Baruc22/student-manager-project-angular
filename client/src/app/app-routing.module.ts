import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component'
import { AlumnosListComponent } from './components/alumnos-list/alumnos-list.component';
import { AlumnosFormComponent } from './components/alumnos-form/alumnos-form.component';
import { ProfesorComponent } from './components/profesor/profesor.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'alumnos',
        component: AlumnosListComponent,
        canActivate: [authGuard]
      },
      {
        path: 'alumnos/add',
        component: AlumnosFormComponent,
        canActivate: [authGuard]
      },
      {
        path: 'alumnos/edit/:id',
        component: AlumnosFormComponent,
        canActivate: [authGuard]
      },
      {
        path: 'profesor/:profesorID',
        component: ProfesorComponent,
        canActivate: [authGuard]
      }
    ]
  },  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
