import multer, {DiskStorageOptions, diskStorage} from 'multer';

class UploadsMiddleware {
    private storageOptions: DiskStorageOptions;

    constructor(public path: string, public client: string) {
        this.storageOptions = {
            destination: (req, file, cb) => {
                cb(null, path);
            },
            filename: (req, file, cb) => {
                cb(null, `${client}-${new Date().toISOString()}-${file}` )
            },
        }
    }

    public init() {
        return multer({
            storage: diskStorage(this.storageOptions)
        })
    }
}

export default UploadsMiddleware;
