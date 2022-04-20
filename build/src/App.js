"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const http = __importStar(require("http"));
const fs_1 = require("fs");
class Application {
    constructor() {
        this.app = express_1.default();
        this.PORT = 2500;
        this.HOSTNAME = 'http://localhost';
        this.availableServer = ['*'];
        this.corsOptions = {
            origin: '*',
            methods: 'GET, POST',
            maxAge: 3600
        };
        this.generalConfig();
        this.routesConfig();
        this.localStorageFoldersConfig();
        this.init();
    }
    generalConfig() {
        this.app.use(cors_1.default(this.corsOptions));
    }
    routesConfig() {
        this.app.use('/api/v1/', routes_1.default);
    }
    localStorageFoldersConfig(paths = ['uploads/lowres']) {
        paths.map(path => {
            if (!fs_1.existsSync(path)) {
                fs_1.mkdirSync(path, { recursive: true });
            }
        });
    }
    ;
    init() {
        http.createServer(this.app)
            .listen(this.PORT)
            .on("listening", () => console.log('Server is running on %s:%d', this.HOSTNAME, this.PORT));
    }
}
exports.Application = Application;
new Application();
//# sourceMappingURL=App.js.map