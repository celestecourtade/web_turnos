import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { TurnosService } from '@turnos/turnos.service';
import { CreateTurnoDto } from '@turnos/dto/create-turno.dto';
import { UpdateTurnoDto } from '@turnos/dto/update-turno.dto';

@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}

  @Post()
  async crearTurno(@Body() body: CreateTurnoDto) {
    const date = new Date(body.date);
    return this.turnosService.crearTurno({ userId: body.userId, date });
  }

  @Get()
  async listarTurnos() {
    return this.turnosService.obtenerTurnos();
  }

  @Get(':id')
  async obtenerTurnoPorId(@Param('id', ParseIntPipe) id: number) {
    return this.turnosService.obtenerTurnoPorId(id);
  }

  @Patch(':id')
  async actualizarTurno(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTurnoDto,
  ) {
    const date = body.date ? new Date(body.date) : undefined;
    return this.turnosService.actualizarTurno(id, { date });
  }

  @Delete(':id')
  async cancelarTurno(@Param('id', ParseIntPipe) id: number) {
    return this.turnosService.cancelarTurno(id);
  }
}
