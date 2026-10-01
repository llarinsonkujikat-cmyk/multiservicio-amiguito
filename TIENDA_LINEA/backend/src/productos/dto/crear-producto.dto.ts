import {
  IsString,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
  IsBoolean,
} from 'class-validator';

export class CrearProductoDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @IsPositive()
  precio: number;

  @IsString()
  @IsOptional()
  categoria?: string;

  @IsString()
  @IsOptional()
  imagen?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
