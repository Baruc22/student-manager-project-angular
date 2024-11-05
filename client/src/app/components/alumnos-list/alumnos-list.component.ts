import { Component, HostBinding, OnInit } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos-list',
  templateUrl: './alumnos-list.component.html',
  styleUrls: ['./alumnos-list.component.css']
})
export class AlumnosListComponent implements OnInit {

  @HostBinding('class') classes = 'row'; //Se agrega la clase 'row' al componente.
  alumnos: any = [];

  constructor(
    private alumnosService: AlumnosService
  ){}

  ngOnInit(): void {
    this.getAlumnos()
  }

  getAlumnos(){
    this.alumnosService.getAlumnos().subscribe({
      next: res => {
        this.alumnos = res; //almacena los alumnos que se obtienen de la BD
      },
      error: err => console.log(err)
    });
  }


  //Metodo de eliminar con mensaje de confirmación 
  deleteAlumno(id:string){
    console.log(id);

    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {

        //Se llama al servicio para ser eliminado el un alumno
        this.alumnosService.delateAlumno(id).subscribe({
          //Obtener una respuesta correcta
          next: res => {
            console.log("Servicio: alumno eliminado");

            //Muestra el mensaje de confirmacion de que el alumno fue eliminado
            Swal.fire({
              title: "¡Eliminado!",
              text: "El alumno ha sido eliminado",
              icon: "success"
            });

            //Se llama al metodo para obtener nuevamente la lista de alumnos y actualizar la vista
            this.getAlumnos();
          }, //Captura la generación de algún error
          error: err => console.log(err)
        });       
      }
    });
  }


}

