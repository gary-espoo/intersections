import {Controller, Get, Res} from '@nestjs/common';
import {Response} from 'express';
import {join} from 'path';
@Controller()
export class AppController {
    constructor() {}

    @Get()
    rootPath(@Res()res : Response) {
        return res
            .status(200)
            .sendFile(join(process.cwd(), 'client', 'index.html'));;
    }
}
