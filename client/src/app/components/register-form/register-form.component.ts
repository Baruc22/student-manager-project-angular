import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Profesor } from 'src/app/models/profesor.model';
import { ProfesoresService } from 'src/app/services/profesores.service';
import { DatosProfesorService } from 'src/app/services/datos-profesor.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  profesor = new Profesor();
  verPassword: boolean;
  verPasswordConfirm: boolean;
  password: string;
  passwordConfirm: string;

  constructor(
    private profesoresService: ProfesoresService,
    private router: Router,
    private datosProfesorService: DatosProfesorService
  ) {
    this.verPassword = false
    this.verPasswordConfirm = false
    this.password = ''
    this.passwordConfirm = ''
  }

  ngOnInit(): void {

  }

  registro() {
    console.log('registro')
    console.log(this.profesor);

    //Hacer la validación de los datos
    this.profesor.password = this.password;
    if (this.profesor.nombre === '' || this.profesor.telefono === '' || this.profesor.correo === '' || this.profesor.password == '') {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Existen campos vacios"
      });
    } else {

      if (this.passwordConfirm === '') {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Debes confirmar la contraseña"
        });
      } else {
        if (this.profesor.password != this.passwordConfirm) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Las contraseñas no coinciden"
          });
        } else {
          //Este dato se define cuando llega a la BD por eso se eliminan aquí
          delete this.profesor.profesorID;

          //Se llama al servicio para guardar la nueva información del alumno
          this.profesoresService.saveProfesor(this.profesor).subscribe({
            next: res => {
              console.log("Servicio: Profesor guardado");
              //Recuperar la información para entrar a la aplicación
              this.profesoresService.existe(this.profesor.correo, this.profesor.password).subscribe((resProfesor: any) => {
                if (resProfesor != -1) {
                  localStorage.setItem('profesorID', resProfesor.profesorID);
                  this.datosProfesorService.setDatosPersonales(resProfesor.profesorID);
                  this.router.navigateByUrl('/home/profesor/' + resProfesor.profesorID);
                } else {
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Datos Incorrectos'
                  });
                }
              })
            },
            error: err => console.error(err)
          });
        }
      }
    }
  }

  mostrarPassword() {
    console.log('Ver contraseña');
    this.verPassword = !this.verPassword;
  }

  mostrarPasswordConfirt() {
    console.log('Ver contraseña');
    this.verPasswordConfirm = !this.verPasswordConfirm;
  }
}
