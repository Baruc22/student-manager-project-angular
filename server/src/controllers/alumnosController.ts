import { Request, Response} from 'express';
import pool from '../database'

class AlumnosController{

    public async list(req: Request,res: Response) {
        const alumnos = await pool.query('SELECT * FROM alumnos');
        res.json(alumnos);
    }

    public async getAlumnoByProfesor(req: Request, res: Response): Promise<any>{        
        const {profesorID} = req.params;
        let consulta = `SELECT * FROM alumnos WHERE profesorID = ${profesorID}`;
        console.log(consulta);
        const alumnos = await pool.query(consulta);
        if(alumnos.length > 0){
            return res.json(alumnos);
        }
        res.status(400).json({Text: "Sin alumnos para el profesor"});
    }

    public async getOne(req: Request,res: Response): Promise<any> {
        const {id} = req.params;
        const alumno = await pool.query('SELECT * FROM alumnos WHERE alumnoID = ?',[id]);
        console.log(alumno);
        if(alumno.length > 0){
            return res.json(alumno[0]);
        }
        res.status(400).json({Text: "El alumno no existe"});
    }

    public async create(req: Request,res: Response):Promise<void> {
        console.log(req.body);
        await pool.query('INSERT INTO alumnos set ?',[req.body]);
        res.json({messege: 'Informacion del alumno guardada'});
    }

    public async delete(req: Request,res: Response):Promise<void> {
        const {id} = req.params;
        await pool.query('DELETE FROM alumnos WHERE alumnoID = ?',[id]);
        res.json({messege: 'Informacion del alumno eliminada'});
    }

    public async update(req: Request,res: Response):Promise<void> {
        const {id} = req.params;
        await pool.query('UPDATE alumnos SET ? WHERE alumnoID = ? ',[req.body,id]);
        res.json({message: 'Informacion del alumno actualizada'});
    }


    public async getAlumnoSearch(req: Request, res: Response): Promise<any>{        
        const {data} = req.params;
        console.log({data})
        let consulta = `SELECT * FROM alumnos WHERE nombre LIKE '%${data}%' OR correo LIKE '%${data}%'`
        const alumnos = await pool.query(consulta);
        console.log(alumnos);
        if(alumnos.length > 0){
            return res.json(alumnos);
        }
        res.json(-1);
    }

    //Se puede separar a otro Controller de 'Materia/s'
    public async listMaterias(req: Request,res: Response){
        const materias = await pool.query('SELECT DISTINCT materia FROM alumnos');
        console.log(materias);
        res.json(materias);
    }
}

export const alumnosController = new AlumnosController();
export default alumnosController;