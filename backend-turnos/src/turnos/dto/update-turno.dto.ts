import { IsOptional, IsString, IsDateString, MinLength } from 'class-validator';

export class UpdateTurnoDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  apellido?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  telefono?: string;

  @IsOptional()
  @IsString()
  servicio?: string;

  @IsOptional()
  @IsDateString()
  date?: string;
}
