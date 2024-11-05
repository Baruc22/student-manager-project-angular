import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosProfesorService } from 'src/app/services/datos-profesor.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  profesorID: number = 0

  constructor(
    private datosProfesorService: DatosProfesorService,
    private router: Router
  ){

    datosProfesorService.datosProfesor$.subscribe( prof =>
      this.profesorID = prof.profesorID
    )

  }

  ngOnInit(): void { }

  cerrarSesion(){
    localStorage.removeItem('profesorID')
    this.router.navigateByUrl('/login')
  }

}
