import { IsString, IsDateString, MinLength, IsEmail } from 'class-validator';

export class CreateTurnoDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  @MinLength(8)
  telefono: string;

  @IsEmail() // ✅ agregá esta línea
  email: string;

  @IsString()
  servicio: string;

  @IsDateString()      
  date: string;
}
