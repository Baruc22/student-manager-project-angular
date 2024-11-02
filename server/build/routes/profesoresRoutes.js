"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profesoresController_1 = __importDefault(require("../controllers/profesoresController"));
class ProfesoresRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', profesoresController_1.default.list);
        this.router.get('/:id', profesoresController_1.default.getOne);
        this.router.post('/', profesoresController_1.default.create);
        this.router.delete('/:id', profesoresController_1.default.delete);
        this.router.put('/:id', profesoresController_1.default.update);
        this.router.post('/autenticar', profesoresController_1.default.existe);
    }
}
const profesoresRoutes = new ProfesoresRoutes();
exports.default = profesoresRoutes.router;
