import ffmpeg from "fluent-ffmpeg";
import {join} from "path";

export class TranscodingController {

    constructor() {}

    public transcodingUploadFileLowRes(filename: string): Promise<unknown> {
        return this.transcodeLowRes(filename);
    };

    private transcodeLowRes(filename: string): Promise<unknown> {
        return new Promise( (resolve, reject) => {
            ffmpeg(join(`${__dirname}/../../uploads/${filename}`))
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
                .save(join(`${__dirname}/../../uploads/lowres/${filename}`))
                .on('end', () => resolve('ENCODED_FILE_SUCCESSFULLY') )
        })
    };
}
