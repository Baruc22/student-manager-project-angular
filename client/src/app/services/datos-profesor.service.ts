import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Profesor } from '../models/profesor.model';
import { ProfesoresService } from './profesores.service';

@Injectable({
  providedIn: 'root'
})
export class DatosProfesorService {

  private datosProfesorSourse = new BehaviorSubject<Profesor>(new Profesor());

  datosProfesor$ = this.datosProfesorSourse.asObservable();

  profesorID: number;

  constructor(
    private profesoresService: ProfesoresService
  ){
    let id = localStorage.getItem('id');

    if(id===null){
      this.profesorID = 0
    }else{
      localStorage.removeItem('id')
      this.profesorID = Number(id);
			window.addEventListener("beforeunload", () => {
				localStorage.setItem("id", this.profesorID + "");
			});
			this.recuperaDatos();
    }
  }

  setDatosPersonales(profesorID: number){
		this.profesorID = profesorID;
		window.addEventListener("beforeunload", () => {
			localStorage.setItem("id", this.profesorID + "");
		});
		this.recuperaDatos();
	}

  private recuperaDatos() {
		this.profesoresService.getProfesor(this.profesorID).subscribe({
			next: (datosProf: any) => {
				this.datosProfesorSourse.next(datosProf as Profesor);
			},
			error: err => console.error(err)
		});
	}

}
