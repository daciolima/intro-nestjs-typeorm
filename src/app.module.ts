import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule} from '@nestjs/config';
import { KeycloakConfigService } from './auth/keycloak/keycloak.service';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';

@Module({

  // import dos modulos de cada recurso.
  // ConfigModule => Permite insertar .env
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  KeycloakConnectModule.register({
    authServerUrl: 'http://localhost:8084/auth',
    realm: 'app-teste',
    clientId: 'backend-cursos',
    secret: 'G8odTgdSdHjhaScu1mp6ZXVintb5lHa5',
    // Secret key of the client taken from keycloak server
  }),
  CoursesModule, DatabaseModule,
],

  controllers: [AppController],

  // Import dos Providers(regras de negócio) 
  providers: [AppService, 
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
