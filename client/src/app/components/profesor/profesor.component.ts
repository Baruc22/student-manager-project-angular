import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profesor } from 'src/app/models/profesor.model';
import { ProfesoresService } from 'src/app/services/profesores.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {

  profesorID: number
  profesor: Profesor

  constructor(
    private profesoresService: ProfesoresService,
    private router: ActivatedRoute
  ) {
    this.profesor = new Profesor()
    this.profesorID = 0
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.profesorID = Number(params.get('profesorID'))

      this.profesoresService.getProfesor(this.profesorID).subscribe({
        next: (resProgesor: any) => {
          this.profesor = resProgesor
        },
        error: err => console.log(err)
      });
    })
  }


  //Método para actualizar información del profesor
  updateProfesor() {

    console.log(this.profesor);
    //delete this.profesor.profesorID; 

    //Se llama al servisio para guardar los cambios
    this.profesoresService.updateProfesor(this.profesor.profesorID, this.profesor).subscribe({

      next: res => {
        console.log(res)

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Información actualizada",
          showConfirmButton: false,
          timer: 1500
        });

      },
      error: err => console.log(err)
    });

  }

}
