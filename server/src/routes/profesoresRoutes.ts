import { Router } from "express";
import profesoresController from '../controllers/profesoresController'

class ProfesoresRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',profesoresController.list);
        this.router.get('/:id',profesoresController.getOne);
        this.router.post('/',profesoresController.create);
        this.router.delete('/:id',profesoresController.delete);
        this.router.put('/:id',profesoresController.update);
        this.router.post('/autenticar', profesoresController.existe);

    }
}

const profesoresRoutes = new ProfesoresRoutes();
export default profesoresRoutes.router;