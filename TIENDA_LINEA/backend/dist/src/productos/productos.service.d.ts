import { Repository } from 'typeorm';
import { Producto } from './entidades/producto.entity';
export declare class ProductosService {
    private readonly productoRepository;
    constructor(productoRepository: Repository<Producto>);
    obtenerTodos(): Promise<Producto[]>;
    obtenerUno(id: number): Promise<Producto | null>;
    crear(datos: Partial<Producto>): Promise<Producto>;
    actualizar(id: number, datos: Partial<Producto>): Promise<Producto | null>;
    eliminar(id: number): Promise<void>;
}
