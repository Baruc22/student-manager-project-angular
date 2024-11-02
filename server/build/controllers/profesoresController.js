"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profesoresController = void 0;
const database_1 = __importDefault(require("../database"));
class ProfesoresController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield database_1.default.query('SELECT * FROM profesores');
            res.json(games);
        });
    }
    existe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Hola como estas');
            const { correo, password } = req.body;
            let consulta = "SELECT profesorID, nombre FROM profesores WHERE correo = '" + correo + "' AND password = '" + password + "'";
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length > 0) {
                res.json({ "profesorID": respuesta[0].profesorID, "nombre": respuesta[0].nombre });
            }
            else
                res.json(-1);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const games = yield database_1.default.query('SELECT * FROM profesores WHERE profesorID = ?', [id]);
            console.log(games);
            if (games.length > 0) {
                return res.json(games[0]);
            }
            res.status(400).json({ Text: "El profesor no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query('INSERT INTO profesores set ?', [req.body]);
            res.json({ messege: 'Informacion del profesor guardada' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM profesores WHERE profesorID = ?', [id]);
            res.json({ messege: 'Informacion del profesor eliminada' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE profesores SET ? WHERE profesorID = ? ', [req.body, id]);
            res.json({ message: 'Informacion del profesor actualizada' });
        });
    }
}
exports.profesoresController = new ProfesoresController();
exports.default = exports.profesoresController;
