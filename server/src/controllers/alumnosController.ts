import { Request, Response} from 'express';
import pool from '../database'

class AlumnosController{

    public async list(req: Request,res: Response) {
        const games = await pool.query('SELECT * FROM alumnos');
        res.json(games);
    }

    public async getOne(req: Request,res: Response): Promise<any> {
        const {id} = req.params;
        const games = await pool.query('SELECT * FROM alumnos WHERE alumnoID = ?',[id]);
        console.log(games);
        if(games.length > 0){
            return res.json(games[0]);
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
}

export const alumnosController = new AlumnosController();
export default alumnosController;