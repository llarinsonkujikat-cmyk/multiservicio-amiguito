import { ProductosService } from './productos.service';
export declare class ProductosController {
    private readonly productosService;
    constructor(productosService: ProductosService);
    obtenerTodos(): Promise<import("./entidades/producto.entity").Producto[]>;
    obtenerUno(id: number): Promise<import("./entidades/producto.entity").Producto>;
    crear(datos: any): Promise<import("./entidades/producto.entity").Producto>;
    actualizar(id: number, datos: any): Promise<import("./entidades/producto.entity").Producto>;
    eliminar(id: number): Promise<void>;
}
