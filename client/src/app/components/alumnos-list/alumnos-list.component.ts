import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from 'src/app/models/alumno.model';
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
  alumnosRespaldo: any = [];
  alumnosFiltrados: any = [];
  materias: any = [];
  searchAlumno: string = '';
  selectMateria: string = '';
  selectEstatus: string = '';
  alumnoEncontrado: boolean = true;
  profesorID: number;


  constructor(
    private alumnosService: AlumnosService,
    private router: ActivatedRoute
  ){ 
    this.profesorID = 0;
   }

  ngOnInit(): void {

    this.profesorID = Number(localStorage.getItem('profesorID'));

    this.getAlumnosPorProfesor()
    this.obtenerMaterias()
  }

  getAlumnosPorProfesor(){
    this.alumnosService.getAlumnosPorProfesor(this.profesorID).subscribe({
      next: res => {
        this.alumnos = res; //almacena los alumnos que se obtienen de la BD
        this.alumnosRespaldo = res;
      },
      error: err => console.log(err)
    });
  }

  getAlumnoSearch(){
    console.log(this.searchAlumno);
    this.alumnosService.getAlumnoSearch(this.searchAlumno).subscribe({
      next: res => {

        if (res!=-1){
          this.alumnos = res
          this.alumnoEncontrado = true;
        }else{
          this.alumnoEncontrado = false;
        }
        
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
            this.getAlumnosPorProfesor();
          }, //Captura la generación de algún error
          error: err => console.log(err)
        });       
      }
    });
  }

  obtenerMaterias(){    
    this.alumnosService.listaMaterias().subscribe({
      next: res => {
        this.materias = res;
        console.log(this.materias)
      },
      error: err => console.log(err)
    });

  }

  filtroAlumnos(){
    console.log('filtro');

    this.searchAlumno = '';

    if(this.selectEstatus === '' || this.selectMateria === ''){
      this.alumnos = this.alumnosRespaldo;
    }

    this.alumnosFiltrados = this.alumnos.filter((alumno: Alumno) =>
      (this.selectMateria === alumno.materia || this.selectMateria === '') &&
      (this.selectEstatus === alumno.estatus || this.selectEstatus === '')
    );

    this.alumnos = this.alumnosFiltrados;

  }

}

