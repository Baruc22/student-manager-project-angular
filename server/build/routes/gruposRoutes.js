"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gruposController_1 = __importDefault(require("../controllers/gruposController"));
class ProfesoresRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', gruposController_1.default.list);
        this.router.get('/:id', gruposController_1.default.getOne);
        this.router.post('/', gruposController_1.default.create);
        this.router.delete('/:id', gruposController_1.default.delete);
        this.router.put('/:id', gruposController_1.default.update);
    }
}
const profesoresRoutes = new ProfesoresRoutes();
exports.default = profesoresRoutes.router;
