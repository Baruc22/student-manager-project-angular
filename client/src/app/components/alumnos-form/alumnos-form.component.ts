import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';


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

  //Para saber si se trata de guardar o editarl información
  edit: boolean = false

  constructor(
    private alumnosService: AlumnosService,
    private router: Router,
    private activatedRoute: ActivatedRoute

  ) { }


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
  }

  //Metodo que permite guardar un nuevo dato al presionar el boton 'Guardar'
  saveNewAlumno() {

    console.log(this.alumno);

    //Hacer la validación de los datos
    if (this.alumno.nombre == '' || this.alumno.calificacion == '' || this.alumno.correo == '' || this.alumno.materia == '') {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Existen campos vacios"
      });
    } else {

      //Estos datos se definen cuando llegan a la BD por eso se eliminan aquí
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
        this.router.navigateByUrl('/home/alumnos')
      }
    });

  }

}
