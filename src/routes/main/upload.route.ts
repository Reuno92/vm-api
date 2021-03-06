import {Request, Response, Router} from 'express';
import UploadsMiddleware from '../../middleware/Uploads.middleware';
import HttpException from '../../models/HttpException';
import {TranscodingController} from '../../controllers/transcoding.controller';
import {join} from "path";
import {existsSync} from "fs";


class UploadRoute {
    public routes = Router({
       caseSensitive: true
    });
    private readonly VIDEO_TYPE_MIMES: Array<string> = ['video/mp4', 'video/quicktime', 'video/mpeg'];

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
            async (req: Request, res: Response) => {

            try {

                if (!req?.file) {
                    throw new HttpException(400,'FILE_MISSING');
                }

                if (existsSync(join(`${__dirname}/../../../uploads/lowres/${req?.file?.filename}`))) {
                    throw new HttpException(409, 'FILE_ALREADY_EXIST');
                }

                new TranscodingController().transcodingUploadFileLowRes(req?.file?.filename)
                    .then( (data: any) => {
                            //
                            res.status(200).json({
                                status: data
                            });
                    })
                    .catch( (err: any) => {
                        res.status(400).json({
                        error: err
                    })
                });
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
