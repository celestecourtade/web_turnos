import { IsInt, IsDateString } from 'class-validator';

export class CreateTurnoDto {
  @IsInt()
  userId: number;

  @IsDateString()
  date: string;
}
