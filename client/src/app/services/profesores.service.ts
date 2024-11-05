import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //Permite realizar las peticiones http
import { Profesor } from '../models/profesor.model' //Se importa el modelo de datos para 'Profesor'

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  API_URI = 'http://localhost:3000/api';

  constructor( private http: HttpClient ) { }

  existe(correo: string, password: string) {
    return this.http.post(`${this.API_URI}/profesores/autenticar`, {correo: correo, password: password});
  }

  getProfesor(id:number){
    return this.http.get(`${this.API_URI}/profesores/${id}`);
  }

  updateProfesor(id: any, updatedProfesor:Profesor){
    return this.http.put(`${this.API_URI}/profesores/${id}`,updatedProfesor);
  }

  

}
