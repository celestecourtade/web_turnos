import { IsOptional, IsDateString } from 'class-validator';

export class UpdateTurnoDto {
  @IsOptional()
  @IsDateString()
  date?: string;
}
