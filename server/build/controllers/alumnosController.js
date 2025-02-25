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
exports.alumnosController = void 0;
const database_1 = __importDefault(require("../database"));
class AlumnosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const alumnos = yield database_1.default.query('SELECT * FROM alumnos');
            res.json(alumnos);
        });
    }
    getAlumnoByProfesor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { profesorID } = req.params;
            let consulta = `SELECT * FROM alumnos WHERE profesorID = ${profesorID}`;
            console.log(consulta);
            const alumnos = yield database_1.default.query(consulta);
            if (alumnos.length > 0) {
                return res.json(alumnos);
            }
            res.status(400).json({ Text: "Sin alumnos para el profesor" });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const alumno = yield database_1.default.query('SELECT * FROM alumnos WHERE alumnoID = ?', [id]);
            console.log(alumno);
            if (alumno.length > 0) {
                return res.json(alumno[0]);
            }
            res.status(400).json({ Text: "El alumno no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query('INSERT INTO alumnos set ?', [req.body]);
            res.json({ messege: 'Informacion del alumno guardada' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM alumnos WHERE alumnoID = ?', [id]);
            res.json({ messege: 'Informacion del alumno eliminada' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE alumnos SET ? WHERE alumnoID = ? ', [req.body, id]);
            res.json({ message: 'Informacion del alumno actualizada' });
        });
    }
    getAlumnoSearch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = req.params;
            console.log({ data });
            let consulta = `SELECT * FROM alumnos WHERE nombre LIKE '%${data}%' OR correo LIKE '%${data}%'`;
            const alumnos = yield database_1.default.query(consulta);
            console.log(alumnos);
            if (alumnos.length > 0) {
                return res.json(alumnos);
            }
            res.json(-1);
        });
    }
    //Se puede separar a otro Controller de 'Materia/s'
    listMaterias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const materias = yield database_1.default.query('SELECT DISTINCT materia FROM alumnos');
            console.log(materias);
            res.json(materias);
        });
    }
}
exports.alumnosController = new AlumnosController();
exports.default = exports.alumnosController;
