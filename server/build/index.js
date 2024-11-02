"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const alumnosRoutes_1 = __importDefault(require("./routes/alumnosRoutes"));
const profesoresRoutes_1 = __importDefault(require("./routes/profesoresRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    //Metodo para configurar el objeto app
    config() {
        this.app.set('port', process.env.PORT || 3000); //Si hay un puerto defido se usa sino | usa el puerto 3000
        this.app.use((0, morgan_1.default)('dev')); //Imprime en consola inf. de lo que solicita el cliente
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json()); //Permite entener los formatos json para la inf.
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    //Método para definir las rutas
    routes() {
        //this.app.use(indexRoutes);
        this.app.use('/api/alumnos', alumnosRoutes_1.default);
        this.app.use('/api/profesores', profesoresRoutes_1.default);
    }
    //Método para iniciar el servidor
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
