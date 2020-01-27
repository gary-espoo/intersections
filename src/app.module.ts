import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ViolationsController } from './violations/violations.controller';
import { ViolationsService } from './violations/violations.service';
import { ViolationsHelpers } from './violations/violations.helpers';
import { ViolationsModule } from './violations/violations.module';




@Module({
  imports: [  
    ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'client'),
  }),
  CacheModule.register(),
  ViolationsModule
],
  controllers: [AppController, ViolationsController],
  providers: [AppService, ViolationsService,ViolationsHelpers],
})
export class AppModule {}
