import {Request, Response, Router} from "express";
import {createReadStream, readdir, ReadStream, statSync} from "fs";
import {lookup} from "mime-types";
import {extname, join} from "path";
import HttpException from "../../models/HttpException";

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
                res.status(416).json({ error: 'Requires Range header'})
            } else {
                /* FILE CONSTANT */
                const PATH: string = join(`${__dirname}/../../../uploads/lowres/${query}`);
                const MIME = lookup(extname(PATH));
                const SIZE = statSync(PATH).size;

                /* REQUEST RANGE */
                const POSITION: Array<string> = RANGE?.replace(/bytes=/, "").split("-")

                /* PREPARE FILE */
                const START = Number(POSITION[0]);
                const END = POSITION[1] ? Number(POSITION[1]) : SIZE - 1;
                const CHUNK_SIZE = (END - START) + 1;

                res.status(206)
                    .setHeader("Content-Range", `bytes ${START}-${END}/${SIZE}`)
                    .setHeader("Accept-Ranges", 'bytes')
                    .setHeader("Content-Length", CHUNK_SIZE)
                    .setHeader("Content-Type", MIME ? MIME : 'video/mp4');

                const VIDEO_STREAM: ReadStream = createReadStream(PATH, {start: START, end: END})
                    .on('open', () =>
                        VIDEO_STREAM.pipe(res))
                    .on('error', (err: Error) =>
                        res?.end(err, () => new HttpException(500, "ERROR_ON_DOWNLOAD"))
                    );
            }
        });
    }
}

export default new FilesRoute().routes;
