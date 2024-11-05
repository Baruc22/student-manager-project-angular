export class Alumno {
	alumnoID?: number
	nombre?: string
    calificacion?: string
    correo?: string
    materia?: string
	constructor() {
		this.alumnoID = 0
		this.nombre = ''
        this.correo = ''
        this.calificacion = ''
        this.materia = ''
	}
}