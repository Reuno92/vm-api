import multer, {diskStorage, DiskStorageOptions} from 'multer';
import fs from 'fs';
import {Request} from 'express';
import HttpException from '../models/HttpException';

class UploadsMiddleware {
    private storageOptions: DiskStorageOptions;
    private readonly MIMES: Array<string>;

    constructor(
        public path: string,
        public typeMIMES: Array<string>
    ) {
        this.MIMES = typeMIMES;
        this.storageOptions = {
            destination: (req, file, cb) => {
                cb(null, path);
            },
            filename: (req, file, cb) => {
                if (!fs.existsSync(`${path}/${file.originalname}`)) {
                    cb(null, `${file.originalname}` );
                } else {
                    cb(new HttpException(400, "FILE_ALREADY_EXIST"), `${file.originalname}`);
                }
            },
        }
    };

    private initMulter(): multer.Multer {
        const TYPES = this.MIMES;
        return multer({
            storage: diskStorage(this.storageOptions),
            fileFilter(req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) {
                if (TYPES.includes(file?.mimetype)) {
                    callback(null, true);
                } else {
                    callback(null, false);
                    return callback(new HttpException(400, "WRONG_FILE_TYPE"));
                }
            }
        });
    }

    public single(filename: string) {
        return this.initMulter().single(filename);
    }
}

export default UploadsMiddleware;
