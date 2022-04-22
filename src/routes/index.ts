import {Router} from "express";
import mainRoutes from './main/upload.route';
import storageRoutes from './main/files.route';

export class IndexRoutes {
    public routes: Router = Router({
        caseSensitive: true,
    });

    constructor() {
        this.routes.use("/uploads", mainRoutes);
        this.routes.use("/files", storageRoutes);
    }

}

export default new IndexRoutes().routes;
