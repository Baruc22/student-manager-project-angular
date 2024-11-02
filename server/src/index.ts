import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import alumnosRoutes from './routes/alumnosRoutes';
import profesoresRoutes from './routes/profesoresRoutes';

class Server{
    public app: Application; //app es un objeto de tipo Application (este tipo se importo desde "express")
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    //Metodo para configurar el objeto app
    config():void{
        this.app.set('port',process.env.PORT || 3000);//Si hay un puerto defido se usa sino | usa el puerto 3000
        this.app.use(morgan('dev'));//Imprime en consola inf. de lo que solicita el cliente
        this.app.use(cors());
        this.app.use(express.json()); //Permite entener los formatos json para la inf.
        this.app.use(express.urlencoded({extended: false}));
    }

    //Método para definir las rutas
    routes():void{
        //this.app.use(indexRoutes);
        this.app.use('/api/alumnos',alumnosRoutes);
        this.app.use('/api/profesores',profesoresRoutes);
    }

    //Método para iniciar el servidor
    start():void{
        this.app.listen(this.app.get('port'), () =>{
            console.log('Server on port',this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();