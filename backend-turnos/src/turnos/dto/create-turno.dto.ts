import { IsString, IsDateString, MinLength } from 'class-validator';

export class CreateTurnoDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  @MinLength(8)
  telefono: string;

  @IsString()
  servicio: string;

  @IsDateString()       // Aquí la fecha es string en formato ISO
  date: string;
}
