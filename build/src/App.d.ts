import express from 'express';
export declare class Application {
    app: express.Application;
    private PORT;
    private HOSTNAME;
    private availableServer;
    private corsOptions;
    constructor();
    private generalConfig;
    private routesConfig;
    private localStorageFoldersConfig;
    private init;
}
