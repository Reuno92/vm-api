import {Request, Response, Router} from "express";

class UploadRoute {
    public routes = Router({
       caseSensitive: true
    });

    constructor() {
        this.index();
    }

    public index() {
        this.routes.get('/', (req: Request, res: Response) => {
            res.status(200).send("<h1>Service in online</h1>");
        });
    }
}

export default new UploadRoute().routes;
