import { Router } from "express";
import alumnosController from '../controllers/alumnosController'

class AlumnosRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',alumnosController.list);
        this.router.get('/:id',alumnosController.getOne);
        this.router.get('/profesor/:profesorID',alumnosController.getAlumnoByProfesor);
        this.router.get('/lista/materias',alumnosController.listMaterias); //*
        this.router.get('/search/:data',alumnosController.getAlumnoSearch);       
        this.router.post('/',alumnosController.create);
        this.router.delete('/:id',alumnosController.delete);
        this.router.put('/:id',alumnosController.update);
        
    }
}

const alumnosRoutes = new AlumnosRoutes();
export default alumnosRoutes.router;