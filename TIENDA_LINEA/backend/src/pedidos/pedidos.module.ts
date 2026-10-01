import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PedidosController } from "./pedidos.controller";
import { PedidosService } from "./pedidos.service";
import { Pedido } from "./entidades/pedido.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Pedido])],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule { }