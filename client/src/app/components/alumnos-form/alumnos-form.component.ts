import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { Location } from '@angular/common';

import { Alumno } from 'src/app/models/alumno.model';
import { AlumnosService } from 'src/app/services/alumnos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css']
})

export class AlumnosFormComponent implements OnInit {

  @HostBinding('class') classes = 'row'; //Se agrega la clase 'row' al componente.

  //Se define el objeto que va almacenar la información
  alumno = new Alumno()
  profesorID: number;
  //Para saber si se trata de guardar o editarl información
  edit: boolean = false

  constructor(
    private alumnosService: AlumnosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location

  ) {
    this.profesorID = 0;
   }


  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
    if (params["id"]) {
      this.alumnosService.getAlumno(params["id"]).subscribe(res => {
        console.log(res);
        this.alumno = res;
        this.edit = true;
      });
    }

    this.profesorID = Number(localStorage.getItem('profesorID'));
  }

  //Metodo que permite guardar un nuevo dato al presionar el boton 'Guardar'
  saveNewAlumno() {

    console.log(this.alumno);

    const calificacion = Number(this.alumno.calificacion)

    if (calificacion >= 6) {
      this.alumno.estatus = 'Aprobado';
    } else {
      this.alumno.estatus = 'Reprobado';
    }

    this.alumno.profesorID = this.profesorID
    
    //Hacer la validación de los datos
    if (this.alumno.nombre == '' || this.alumno.calificacion == '' || this.alumno.correo == '' || this.alumno.materia == '') {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Existen campos vacios"
      });
    } else {

      //Este dato se define cuando llega a la BD por eso se eliminan aquí
      delete this.alumno.alumnoID;

      //Se llama al servicio para guardar la nueva información del alumno
      this.alumnosService.saveAlumno(this.alumno).subscribe({
        next: res => {
          console.log("Servicio: Alumno guardado");

          //Muestra la confirmación de que la información del alumno fue guardada
          Swal.fire({
            position: "center",
            icon: "success",
            title: "La información ha sido guardada",
            showConfirmButton: true,
          });

          //Se le indica la ruta donde se quiere ir después de guardar la información del alumno
          this.router.navigateByUrl('/home/alumnos')

        },
        error: err => console.error(err)
      });
    }
  }

  //Método para actualizar información de un alumno
  updateAlumno() {
    Swal.fire({
      title: "¿Quieres guardar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: "No guardar",
      cancelButtonText: "Cancelar"
    }).then((result) => {

      if (result.isConfirmed) {

        console.log(this.alumno);
        const calificacion = Number(this.alumno.calificacion)

        if (calificacion >= 6) {
          this.alumno.estatus = 'Aprobado';
        } else {
          this.alumno.estatus = 'Reprobado';
        }

        //Hacer la validacion de datos
        if (this.alumno.nombre == '' || this.alumno.calificacion == '' || this.alumno.correo == '' || this.alumno.materia == '') {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Existen campos vacios"
          });
        } else {
          //Se llama al servisio para guardar los cambios
          this.alumnosService.updateAlumno(this.alumno.alumnoID, this.alumno).subscribe({

            next: res => {
              console.log(res)

              //Muestra la confirmación de que la información del alumno fue guardada
              Swal.fire("Guardado", "", "success");

              this.router.navigateByUrl('/home/alumnos')
            },
            error: err => console.log(err)
          });
        }

      } else if (result.isDenied) {
        Swal.fire("Cambios sin guardar", "", "info");
        this.router.navigateByUrl('/home/alumnos');
      }
    });

  }

  botonCancelar() {
    Swal.fire({
      title: "¿Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#009455",
      confirmButtonText: "Si",
      cancelButtonText: "Volver"
    }).then((result) => {
      if (result.isConfirmed) {

        this.location.back();
      }
    });
  }

  convertir(num: any) {
    return parseInt(num, 10);
  }

}
