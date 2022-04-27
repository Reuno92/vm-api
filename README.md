# Video Menthe - Test Api

## Summary

1. [Statement](#Statement)
2. [Project Structure](#Project-Structure)
3. [Dependencies](#Dependencies)
4. [Development Dependencies](#Development-Dependencies)
5. [How to Start](#How-To-Start)
    * [Installation](#Installation)
    * [Start Application](#Start-Application)
    * [Still To Be Done](#Still-To-Be-Done)

## Statement

Create a NodeJs/Express REST API server to manage a simple client-server app to upload, compress and view video files

The back-end application wil use Typescript and ExpressJS and will have 2 REST routes:
* And "upload" route to upload a file and create a low-res of it
  * It must `fluent-ffmpeg` package to generrate a low-res video from uploaded one
  * Only transcoded file should be stored on the server.
* A "files" routes to get one or all of available (low-res) videos.

> NOTES :
> - Asynchronous calls should use async/await
> - Here is an example of pure ffmpeg command to generate a low-res video:
> `ffmpeg -i <FILE_PATH> -flags:v+ildct -v:c libx264 -:b:v 1M -a:c aac <TARGET_PATH> -y -r25`

## Project Structure

| Name Folder           | Description                                             |
|:----------------------|---------------------------------------------------------|
| src                   | Source file                                             | 
| src/**abstraction**   | Abstract Classes and interfaces                         |
| src/**controllers**   | Rest API Components and controllers                     | 
| src/**environments**  | Application environments handling utility               | 
| src/**routes**        | REST API Routes                                         |
| src/**lib**           | Reusable utilises and library source code like a logger |
| src/**middleware**    | Express middleware like error handler feature           |          
| build                 | Compiled source files will be placed here               |
| tests                 | Test cases will be placed here                          |
| tests/**helpers**     | Helpers for test access will be placed here             |
| tests/**unit-test**   | Unit test cases will be placed here                     |
| test/**integrations** | API Routes (Integration) test cases will be placed here |

## Dependencies

* body-parser: extracts the entire body portion of an incoming request stream and exposes it on req.body.
* cors: CORS is a node.js package for providing a [Connect](https://github.com/senchalabs/connect#readme) / [Express](http://expressjs.com/) middleware that can be used to enable [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) with various options.
* express: express:  Fast, unopinionated, minimalist web framework for [Node.js](https://nodejs.org/en/).
* fluent-ffmpeg: This library abstracts the complex command-line usage of [ffmpeg](https://ffmpeg.org/) into a fluent, easy to use [Node.js](https://nodejs.org/en/) module.
* mime-types: The ultimate javascript content-type utility.
* multer: Multer is a [Node.js](https://nodejs.org/en/) middleware for handling `multipart/form-data`, which is primarily used for uploading files.

> All modules beginning with `@types/`, its just definition for typescript for the module in question. These are mainly development dependencies.

## Development Dependencies
* ts-node-dev: It restarts target node process when any of required files changes (as standard [node-dev](https://github.com/fgnass/node-dev)) but shares [Typescript](https://www.typescriptlang.org/) compilation process between restarts.
* gts: [gts](https://github.com/google/gts) is Google's TypeScript style guide, and the configuration for our formatter, linter, and automatic code fixer. No lint rules to edit, no configuration to update, no more bike shedding over syntax. 

## How To Start

### Installation

#### With NPM 
```bash
npm i
``` 
or 
```bash
npm
```

#### With YARN
If it doesn't exist on your system or node modules
```bash
npm install --global yarn
```
and for install all your dependencies
```bash
yarn
```

### Start Application

#### With NPM
```bash
npm run start:dev
```

#### With NPM
```bash
yarn start dev
```

### Still To Be Done
 * ~~Delete files when transcode is effective~~.
 * ~~Find a way to stream a file to route~~.

