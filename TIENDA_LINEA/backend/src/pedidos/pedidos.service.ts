import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Pedido } from "./entidades/pedido.entity";

@Injectable()
export class PedidosService {
    constructor(
        @InjectRepository(Pedido)
        private readonly pedidoRepository: Repository<Pedido>,
    ) { }

    async crear(datos: Partial<Pedido>) {
        const pedido =
            this.pedidoRepository.create(datos);

        return this.pedidoRepository.save(pedido);
    }

    async obtenerTodos() {
        return this.pedidoRepository.find({
            order: {
                fecha: "DESC",
            },
        });
    }

    async obtenerUno(id: number) {
        return this.pedidoRepository.findOne({
            where: { id },
        });
    }
}