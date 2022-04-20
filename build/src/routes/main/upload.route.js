"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class UploadRoute {
    constructor() {
        this.routes = express_1.Router({
            caseSensitive: true
        });
        this.index();
    }
    index() {
        this.routes.get('/', (req, res) => {
            res.status(200).send("<h1>Service in online</h1>");
        });
    }
}
exports.default = new UploadRoute().routes;
//# sourceMappingURL=upload.route.js.map