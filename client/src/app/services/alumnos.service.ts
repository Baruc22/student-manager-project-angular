import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alumno } from '../models/alumno.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  API_URI = 'http://localhost:3000/api';

  constructor( private http:HttpClient) { }

  getAlumnos(){
    return this.http.get(`${this.API_URI}/alumnos`);
  }

  getAlumnosPorProfesor(profesorID: number){
    return this.http.get(`${this.API_URI}/alumnos/profesor/${profesorID}`);
  }

  getAlumnoSearch(data: string){
    return this.http.get(`${this.API_URI}/alumnos/search/${data}`);
  }

  getAlumno(id: string){
    return this.http.get(`${this.API_URI}/alumnos/${id}`);
  }

  delateAlumno(id: string){
    return this.http.delete(`${this.API_URI}/alumnos/${id}`);
  }

  saveAlumno(alumno: Alumno){
    return this.http.post(`${this.API_URI}/alumnos`,alumno);
  }

  updateAlumno(id: any, updatedAlumno:Alumno):Observable<Alumno>{ //Regresa un objeto de tipo Alumno
    return this.http.put(`${this.API_URI}/alumnos/${id}`,updatedAlumno);
  }

  //Revisar puede ser obsoleto
  // getAlumnoPorEstatus(estatus: string){
  //   return this.http.get(`${this.API_URI}/alumnos/filtro/estatus/${estatus}`);
  // }

  //Se pueden crear en otro services
  listaMaterias(){
    return this.http.get(`${this.API_URI}/alumnos/lista/materias`);
  }

  //Revisar puede ser obsoleto
  // getAlumnoPorMateria(nombreMateria: string){
  //   return this.http.get(`${this.API_URI}/alumnos/filtro/materias/${nombreMateria}`);
  // }

}
