import {Request, Response, Router} from "express";
import UploadsMiddleware from "../../middleware/Uploads.middleware";
import HttpException from "../../models/HttpException";

class UploadRoute {
    public routes = Router({
       caseSensitive: true
    });
    public VIDEO_TYPE_MIMES: Array<string> = ["video/mp4", "video/quicktime", "video/mpeg"];

    constructor() {
        this.index();
        this.uploadVideos();
    }

    private index() {
        this.routes.get('/', (req: Request, res: Response) => {
            res.status(200).send('<h1>Service in online</h1>');
        });
    }

    private uploadVideos() {
        this.routes.post('/video',
            new UploadsMiddleware('uploads', this.VIDEO_TYPE_MIMES).single('file'),
            (req: Request, res: Response ) => {

            try {
                if (!req?.file) {
                    throw new HttpException(400,'FILE_MISSING');
                } else {
                    res.status(200)
                        .json({ status: 'success' });
                }
            } catch (err: any) {
                res.status(400)
                    .json({
                        status: err?.message
                    });
            }
        });
    }
}

export default new UploadRoute().routes;
