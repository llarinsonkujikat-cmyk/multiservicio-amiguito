import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { ProductosService } from './productos.service';

@Controller('productos')
export class ProductosController {
  constructor(
    private readonly productosService: ProductosService,
  ) { }

  @Get()
  obtenerTodos() {
    return this.productosService.obtenerTodos();
  }

  @Get(':id')
  obtenerUno(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productosService.obtenerUno(id);
  }

  @Post()
  crear(@Body() datos: any) {
    return this.productosService.crear(datos);
  }

  @Put(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: any,
  ) {
    return this.productosService.actualizar(id, datos);
  }

  @Delete(':id')
  eliminar(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productosService.eliminar(id);
  }
}