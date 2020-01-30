import {Module,CacheModule} from '@nestjs/common';
import {ViolationsService} from './violations.service';
import {ViolationsStore} from './violations.helpers';
import {ViolationsController} from './violations.controller';
@Module({
    imports:[
        CacheModule.register(),
    ],
    controllers: [ViolationsController],
    providers: [ViolationsService, ViolationsStore]
})
export class ViolationsModule {}