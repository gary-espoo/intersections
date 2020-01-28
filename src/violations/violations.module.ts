import { Module } from '@nestjs/common';
import { ViolationsService } from './violations.service';
import { ViolationsStore } from './violations.helpers';
import { ViolationsController } from './violations.controller';

@Module({
    controllers:[ViolationsController],
    providers:[ViolationsService,ViolationsStore]
})
export class ViolationsModule {
    
}
