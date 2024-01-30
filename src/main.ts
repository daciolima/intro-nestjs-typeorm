import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { KeycloakConnectModule, PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';
import { KeycloakConfigService } from './auth/keycloak/keycloak.service';
import { ConfigModule } from '@nestjs/config';


// Cria instância da aplicação e a coloca em execução.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  KeycloakConnectModule.registerAsync({
    useExisting: KeycloakConfigService,
    imports: [ConfigModule]
  })

  app.enableCors();

  // Middlewares 
  // Passando instancia de recursos habilitando funcionalidades
  app.useGlobalPipes(new ValidationPipe({ 
    
    // whitelist permite apenas entrada de valores body para POST e PUT conforme seus DTOs
    whitelist: true,

    // Rejeita o request caso tenha propriedades recusadas
    forbidNonWhitelisted: true,
    
    // Infere type caso necessário. Ex: id em request vem com tipo string, converte em number.
    transform: true
  })) 

  await app.listen(3000);
}
bootstrap();
