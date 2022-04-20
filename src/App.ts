import express, {Request, Response} from 'express';
import cors from 'cors';
import IndexRoutes from "./routes";
import http from "http";
import {existsSync, mkdirSync} from "fs";
import bodyParser from "body-parser";
import HttpException from "./models/HttpException";
import errorMiddleware from "./middleware/errors.middleware";

export class Application {
    public app : express.Application = express();

    private PORT: number = 2500;
    private HOSTNAME: string = 'http://localhost';
    private availableServer: string = '*';

    private corsOptions: cors.CorsOptions = {
        origin: this.availableServer,
        methods: ['GET', 'POST', 'OPTIONS'],
        maxAge: 3600
    }

    constructor() {
        this.generalConfig();
        this.routesConfig();
        this.localStorageFoldersConfig();
        this.errorManagement();
        this.init();
    }

    private generalConfig() {
        this.app.use(cors(this.corsOptions));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private routesConfig() {
        this.app.use('/api/v1/', IndexRoutes);
    }

    private localStorageFoldersConfig(paths: Array<string> = ['uploads/lowres']) {
        paths.map( path => {
            if (!existsSync(path)) {
                mkdirSync(path, { recursive: true })
            }
        });
    };

    private errorManagement() {
        this.app.use( (err: HttpException, req: Request, res: Response) => {
            return errorMiddleware(err, req, res);
        });
    }

    private init() {
        http.createServer(this.app)
            .listen(this.PORT)
            .on("listening", () => console.log('Server is running on %s:%d', this.HOSTNAME, this.PORT))
    }
}

new Application();
