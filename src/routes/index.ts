import {Router} from "express";
import mainRoutes from './main/upload.route';

export class IndexRoutes {
    public routes: Router = Router({
        caseSensitive: true,
    });

    constructor() {
        this.routes.use("/uploads", mainRoutes);
    }

}

export default new IndexRoutes().routes;
