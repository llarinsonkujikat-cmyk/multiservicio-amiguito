import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { ProductosModule } from './productos/productos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { PedidosModule } from './pedidos/pedidos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: 'postgres',

        host: configService.get<string>(
          'DB_HOST',
          'localhost',
        ),

        port: configService.get<number>(
          'DB_PORT',
          5432,
        ),

        username: configService.get<string>(
          'DB_USERNAME',
          'postgres',
        ),

        password: configService.get<string>(
          'DB_PASSWORD',
          'huite',
        ),

        database: configService.get<string>(
          'DB_NAME',
          'tienda_en_linea',
        ),

        autoLoadEntities: true,

        synchronize: true,
      }),
    }),

    UsuariosModule,
    AuthModule,
    ProductosModule,
    CategoriasModule,
    PedidosModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule { }