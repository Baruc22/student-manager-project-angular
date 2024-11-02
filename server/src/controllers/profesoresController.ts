import { Request, Response} from 'express';
import pool from '../database'

class ProfesoresController{

    public async list(req: Request,res: Response) {
        const games = await pool.query('SELECT * FROM profesores');
        res.json(games);
    }

    public async existe(req: Request, res: Response): Promise<void> {
        console.log('Hola como estas')
		const { correo, password } = req.body;
		let consulta = "SELECT profesorID, nombre FROM profesores WHERE correo = '" + correo + "' AND password = '" + password + "'";
		const respuesta = await pool.query(consulta);
		if (respuesta.length > 0) {			
		    res.json({ "profesorID": respuesta[0].profesorID, "nombre": respuesta[0].nombre})
		}
		else
			res.json(-1);
	}

    public async getOne(req: Request,res: Response): Promise<any> {
        const {id} = req.params;
        const games = await pool.query('SELECT * FROM profesores WHERE profesorID = ?',[id]);
        console.log(games);
        if(games.length > 0){
            return res.json(games[0]);
        }
        res.status(400).json({Text: "El profesor no existe"});
    }

    public async create(req: Request,res: Response):Promise<void> {
        console.log(req.body);
        await pool.query('INSERT INTO profesores set ?',[req.body]);
        res.json({messege: 'Informacion del profesor guardada'});
    }

    public async delete(req: Request,res: Response):Promise<void> {
        const {id} = req.params;
        await pool.query('DELETE FROM profesores WHERE profesorID = ?',[id]);
        res.json({messege: 'Informacion del profesor eliminada'});
    }

    public async update(req: Request,res: Response):Promise<void> {
        const {id} = req.params;
        await pool.query('UPDATE profesores SET ? WHERE profesorID = ? ',[req.body,id]);
        res.json({message: 'Informacion del profesor actualizada'});
    }
}

export const profesoresController = new ProfesoresController();
export default profesoresController;