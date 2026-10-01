import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Producto } from './entidades/producto.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) { }

  async obtenerTodos(): Promise<Producto[]> {
    return this.productoRepository.find({
      where: {
        activo: true,
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async obtenerUno(id: number): Promise<Producto | null> {
    return this.productoRepository.findOne({
      where: {
        id,
      },
    });
  }

  async crear(datos: Partial<Producto>): Promise<Producto> {
    const producto = this.productoRepository.create(datos);

    return this.productoRepository.save(producto);
  }

  async actualizar(
    id: number,
    datos: Partial<Producto>,
  ): Promise<Producto | null> {
    const producto = await this.obtenerUno(id);

    if (!producto) {
      return null;
    }

    Object.assign(producto, datos);

    return this.productoRepository.save(producto);
  }

  async eliminar(id: number): Promise<void> {
    await this.productoRepository.delete(id);
  }
}