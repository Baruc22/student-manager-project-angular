import { Component, OnInit } from '@angular/core';
import { Profesor } from '../models/profesor.model';
import { ProfesoresService } from '../services/profesores.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit{

  profesor = new Profesor();

  constructor(
    private profesoresService: ProfesoresService,
    private router: Router
  ){}

  ngOnInit(): void {
    
  }

  registro(){
    console.log('registro')
    console.log(this.profesor);
    
        //Hacer la validación de los datos
        if (this.profesor.nombre == '' || this.profesor.telefono == '' || this.profesor.correo == '' || this.profesor.password == '') {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Existen campos vacios"
          });
        }else{
          //Este dato se define cuando llega a la BD por eso se eliminan aquí
          delete this.profesor.profesorID;

          //Se llama al servicio para guardar la nueva información del alumno
                this.profesoresService.saveProfesor(this.profesor).subscribe({
                  next: res => {
                    console.log("Servicio: Profesor guardado");
          
                    //Muestra la confirmación de que la información del alumno fue guardada
                    Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "La información ha sido guardada",
                      showConfirmButton: true,
                    });
          
                    //Se le indica la ruta donde se quiere ir después de guardar la información del alumno
                    this.router.navigateByUrl('/login')
          
                  },
                  error: err => console.error(err)
                });

        }
  }
}
