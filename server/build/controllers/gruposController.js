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
exports.gruposController = void 0;
const database_1 = __importDefault(require("../database"));
class GruposController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield database_1.default.query('SELECT * FROM grupos');
            res.json(games);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const games = yield database_1.default.query('SELECT * FROM grupos WHERE grupoID = ?', [id]);
            console.log(games);
            if (games.length > 0) {
                return res.json(games[0]);
            }
            res.status(400).json({ Text: "El grupo no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query('INSERT INTO grupos set ?', [req.body]);
            res.json({ messege: 'Informacion del grupo guardada' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM grupos WHERE grupoID = ?', [id]);
            res.json({ messege: 'Informacion del grupo eliminada' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE grupos SET ? WHERE grupoID = ? ', [req.body, id]);
            res.json({ message: 'Informacion del grupo actualizada' });
        });
    }
}
exports.gruposController = new GruposController();
exports.default = exports.gruposController;
