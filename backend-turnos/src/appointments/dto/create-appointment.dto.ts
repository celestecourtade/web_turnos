import { IsString, IsDateString, MinLength, IsEmail } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @MinLength(8)
  phone: string;

  @IsEmail() // ✅ validación email
  email: string;

  @IsString()
  service: string;

  @IsDateString()
  date: string;
}
