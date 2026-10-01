import { Repository } from "typeorm";
import { Pedido } from "./entidades/pedido.entity";
export declare class PedidosService {
    private readonly pedidoRepository;
    constructor(pedidoRepository: Repository<Pedido>);
    crear(datos: Partial<Pedido>): Promise<Pedido>;
    obtenerTodos(): Promise<Pedido[]>;
    obtenerUno(id: number): Promise<Pedido>;
}
