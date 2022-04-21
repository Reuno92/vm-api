import {Request, Response, Router} from "express";
import UploadsMiddleware from "../../middleware/Uploads.middleware";
import HttpException from "../../models/HttpException";
import httpException from "../../models/HttpException";
import ffmpeg, {FfprobeData} from 'fluent-ffmpeg';
import {join} from "path";

class UploadRoute {
    public routes = Router({
       caseSensitive: true
    });
    public VIDEO_TYPE_MIMES: Array<string> = ["video/mp4", "video/quicktime", "video/mpeg"];

    constructor() {
        this.index();
        this.uploadVideos();
        this.transcodeTest();
        this.getMetadata();
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
                } else {
                    new Promise( (resolve, reject) => {
                        ffmpeg(join(`${__dirname}/../../../uploads/${req?.file?.filename}`))
                            .videoCodec('libx264')
                            .videoBitrate('1000k', true)
                            .fps(25)
                            .audioCodec('aac')
                            //.outputOption('-flags:v+ildct')
                            .on('error', (err: any) => reject(err))
                            /*
                            .on('progress', (progress) => {
                                res.write(JSON.stringify(progress, null, 2));
                            })
                             */
                            .save(join(`${__dirname}/../../../uploads/lowres/${req?.file?.filename}`))
                            .on('end', () => resolve('ENCODED_FILE_SUCCESSFULLY') );
                    }).then( (data: any) =>
                        res.status(200).json({
                            status: data
                        })
                    ).catch( (err: any) => {
                        res.status(400).json({
                            error: err
                        })
                    });
                }
            } catch (err: any) {
                res.status(400)
                    .json({
                        error: err?.message
                    });
            }
        });
    }

    public getMetadata(path: string = join(`${__dirname}/../../../uploads/AMAGI_PiROG_TEST_10643.mp4`) ) {
        this.routes.get('/metadata', (req: Request, res: Response) => {

            try {
                ffmpeg(path)
                    .ffprobe( (err, data: FfprobeData) => {
                        if (err) {
                            console.log(err?.message.split('\n')[13])
                            throw new httpException(400, "Error with ffprobe");
                        }
                        res.status(200).json(data)
                });
            } catch (err: any) {
                console.error(err);
            }

        });
    }

    public transcodeTest(path: string = 'AMAGI_PROG_TEST_10643.mp4') {
        this.routes.get('/transcode', (req: Request, res: Response) => {
            const MEDIA = ffmpeg(join(`${__dirname}/../../../uploads/${path}`))
                .videoCodec('libx264')
                .videoBitrate('1M', true)
                .fps(25)
                .audioCodec('aac')
                //.outputOption('-flags:v+ildct')
                .output(join(`${__dirname}/../../../uploads/lowres/${path}`));

            res.status(200).json({
                MEDIA
            });
        });
    }
}

export default new UploadRoute().routes;
