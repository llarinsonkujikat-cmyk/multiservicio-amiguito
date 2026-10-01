import {
    Body,
    Controller,
    Get,
    Param,
    Post,
} from "@nestjs/common";

import { PedidosService } from "./pedidos.service";

@Controller("pedidos")
export class PedidosController {
    constructor(
        private readonly pedidosService: PedidosService,
    ) { }

    @Post()
    crear(@Body() datos: any) {
        return this.pedidosService.crear(datos);
    }

    @Get()
    obtenerTodos() {
        return this.pedidosService.obtenerTodos();
    }

    @Get(":id")
    obtenerUno(@Param("id") id: string) {
        return this.pedidosService.obtenerUno(
            Number(id),
        );
    }
}