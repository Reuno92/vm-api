import {Request, Response, Router} from "express";
import {createReadStream, readdir, statSync} from "fs";
import {lookup} from "mime-types";
import {extname, join} from "path";

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
            const query = req?.query?.file;

            const RANGE = req?.headers?.range;

            if (!RANGE) {
                res.status(400).send('Requires Range header')
            }

            const PATH: string = join(`${__dirname}/../../../uploads/lowres/${query}`);
            const MIME = lookup(extname(PATH));
            const SIZE = statSync(PATH).size;
            const CHUNK_SIZE = 1000000;
            const START = Number(RANGE?.replace(/\D/g, ""));
            const END = Math.min(START + CHUNK_SIZE, SIZE - 1);
            const CONTENT_LENGTH = END - START + 1;

            res.status(206)
                .setHeader("Content-Range", `bytes ${START}-${END}/${SIZE}`)
                .setHeader("Accept-Ranges", 'bytes')
                .setHeader("Content-Length", CONTENT_LENGTH)
                .setHeader("Content-Type", MIME ? MIME : 'video/mp4');

            const VIDEO_STREAM = createReadStream(PATH, {start: START, end: END});
            VIDEO_STREAM.pipe(res);
        });
    }
}

export default new FilesRoute().routes;
