import { DiskStorageOptions } from 'multer';
export declare class UploadsMiddleware {
    path: string;
    client: string;
    private storageOptions;
    constructor(path: string, client: string);
    getStorageOptions(): DiskStorageOptions;
}
