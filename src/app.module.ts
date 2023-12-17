import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule} from '@nestjs/config';

@Module({

  // import dos modulos de cada recurso.
  // ConfigModule => Permite insertar .env
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  CoursesModule, DatabaseModule],

  controllers: [AppController],

  // Import dos Providers(regras de negócio) 
  providers: [AppService],
})
export class AppModule {}
