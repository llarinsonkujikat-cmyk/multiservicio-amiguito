import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity('pedidos')
export class Pedido {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    numeroPedido: string;

    @Column()
    nombreCliente: string;

    @Column()
    telefono: string;

    @Column()
    direccion: string;

    @Column()
    ciudad: string;

    @Column({ nullable: true })
    referencia: string;

    @Column()
    entrega: string;

    @Column()
    metodoPago: string;

    @Column({ type: 'jsonb', nullable: true })
    productos: any[];

    @Column('int')
    cantidadProductos: number;

    @Column('decimal', {
        precision: 10,
        scale: 2,
    })
    total: number;

    @Column({
        default: 'Pendiente de pago',
    })
    estado: string;

    @CreateDateColumn()
    fecha: Date;
}