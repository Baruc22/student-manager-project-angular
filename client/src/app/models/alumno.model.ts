export class Alumno {
	alumnoID?: number
    profesorID?: number
	nombre?: string
    calificacion?: string
    correo?: string
    materia?: string
    estatus?: string
	constructor() {
		this.alumnoID = 0
		this.nombre = ''
        this.correo = ''
        this.calificacion = ''
        this.materia = ''
        this.estatus = ''
	}
}