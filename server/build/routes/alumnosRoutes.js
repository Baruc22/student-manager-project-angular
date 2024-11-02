"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alumnosController_1 = __importDefault(require("../controllers/alumnosController"));
class AlumnosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', alumnosController_1.default.list);
        this.router.get('/:id', alumnosController_1.default.getOne);
        this.router.post('/', alumnosController_1.default.create);
        this.router.delete('/:id', alumnosController_1.default.delete);
        this.router.put('/:id', alumnosController_1.default.update);
    }
}
const alumnosRoutes = new AlumnosRoutes();
exports.default = alumnosRoutes.router;
