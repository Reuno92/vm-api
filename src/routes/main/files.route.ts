import {Request, Response, Router} from "express";
import {readdir} from "fs";
import {join} from "path";

class FilesRoute {
    public routes = Router({
        caseSensitive: true
    });

    constructor() {
        this.getAllLowRes();
        this.getOneLowRes();
    }

    private getAllLowRes() {
        this.routes.get('/alllowres', (req: Request, res: Response) => {
            readdir(join(`${__dirname}/../../../uploads/lowres/`), (err: NodeJS.ErrnoException | null, files: Array<string>) => {
                if (err) {
                    res.status(400)
                       .json({
                            error: err?.message
                       });
                } else {
                    res.status(200)
                       .json({
                            status: 'successful',
                            result: files
                       });
                }
            });
        });
    }

    private getOneLowRes() {
        this.routes.get('/onelowres', (req: Request, res: Response) => {
            const query = req?.query?.index;

            readdir(join(`${__dirname}/../../../uploads/lowres/`), (err: NodeJS.ErrnoException | null, files: Array<string>) => {
                if (err || !query) {
                    return res.status(400)
                              .json({
                            error: err?.message || 'Index don\'t exists '
                        });
                } else {
                    /*
                        I wanted to reuse for a search for example,
                        maybe if an another methods to be still better
                    */
                        // file: save.mpg => query: save
                        // It's maybe a problem if two files have a same name but with different extension

                    return res.status(200)
                              .json({
                          status: 'successful',
                          result: files[Number(query)]
                   });
                }
            });
        });
    }
}

export default new FilesRoute().routes;
