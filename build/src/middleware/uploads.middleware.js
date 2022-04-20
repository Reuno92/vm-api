"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsMiddleware = void 0;
class UploadsMiddleware {
    constructor(path, client) {
        this.path = path;
        this.client = client;
        this.storageOptions = {
            destination: (req, file, cb) => {
                cb(null, path);
            },
            filename: (req, file, cb) => {
                cb(null, `${client}-${new Date().toISOString()}-${file}`);
            },
        };
    }
    getStorageOptions() {
        return this.storageOptions;
    }
}
exports.UploadsMiddleware = UploadsMiddleware;
//# sourceMappingURL=uploads.middleware.js.map