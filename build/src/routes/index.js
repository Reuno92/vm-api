"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexRoutes = void 0;
const express_1 = require("express");
const upload_route_1 = __importDefault(require("./main/upload.route"));
class IndexRoutes {
    constructor() {
        this.routes = express_1.Router({
            caseSensitive: true,
        });
        this.routes.use("/uploads", upload_route_1.default);
    }
}
exports.IndexRoutes = IndexRoutes;
exports.default = new IndexRoutes().routes;
//# sourceMappingURL=index.js.map