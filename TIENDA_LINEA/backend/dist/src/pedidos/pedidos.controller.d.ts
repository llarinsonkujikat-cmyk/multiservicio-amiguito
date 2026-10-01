import { PedidosService } from "./pedidos.service";
export declare class PedidosController {
    private readonly pedidosService;
    constructor(pedidosService: PedidosService);
    crear(datos: any): Promise<import("./entidades/pedido.entity").Pedido>;
    obtenerTodos(): Promise<import("./entidades/pedido.entity").Pedido[]>;
    obtenerUno(id: string): Promise<import("./entidades/pedido.entity").Pedido>;
}
