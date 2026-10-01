import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ default: 0 })
  stock: number;

  @Column({ length: 100 })
  categoria: string;

  @Column({ type: 'text', nullable: true })
  imagen: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}