import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../models/profesor.model'
import { Usuario } from '../../models/usuario.model'
import { ProfesoresService } from '../../services/profesores.service'
import Swal from 'sweetalert2';
import { Router } from '@angular/router'
import { DatosProfesorService } from 'src/app/services/datos-profesor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  profesor: Profesor
  usuario: Usuario

  constructor(
    private router: Router,
    private profesoresService: ProfesoresService,
    private datosProfesorService: DatosProfesorService
  ){
    this.profesor = new Profesor()
    this.usuario = new Usuario()
  }

  ngOnInit(): void {}

  logueo(): void {
    this.profesoresService.existe(this.usuario.correo, this.usuario.password).subscribe((resProfesor: any) => {
      if (resProfesor != -1) {
        this.profesor.correo = this.usuario.correo
        localStorage.setItem('profesorID', resProfesor.profesorID);
        
        this.datosProfesorService.setDatosPersonales(resProfesor.profesorID);

        this.router.navigateByUrl('/home/profesor/' + resProfesor.profesorID);
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Datos Incorrectos'
        })
      }
    },
      err => console.error(err)
    );
  }

}
