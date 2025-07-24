import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  ParseIntPipe,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';

@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}

  @Post()
  async crearTurno(@Body() createTurnoDto: CreateTurnoDto) {
    return this.turnosService.crearTurno(createTurnoDto);
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
    const turnoActualizado: any = {
      ...body,
    };

    if (body.date) {
      turnoActualizado.date = new Date(body.date);  // Convertir si viene
    }

    return this.turnosService.actualizarTurno(id, turnoActualizado);
  }

  @Delete(':id')
  async cancelarTurno(@Param('id', ParseIntPipe) id: number) {
    return this.turnosService.cancelarTurno(id);
  }

  // --- NUEVOS ENDPOINTS para cancelar vía token ---

  @Get('cancel/:token')
  async obtenerTurnoPorToken(@Param('token') token: string) {
    const turno = await this.turnosService.obtenerTurnoPorCancelToken(token);
    if (!turno) {
      throw new NotFoundException('Turno no encontrado con ese token');
    }
    return turno;
  }

  @Delete('cancel/:token')
  @HttpCode(204) // 204 No Content
  async cancelarTurnoPorToken(@Param('token') token: string) {
    const turno = await this.turnosService.obtenerTurnoPorCancelToken(token);
    if (!turno) {
      throw new NotFoundException('Turno no encontrado con ese token');
    }
    await this.turnosService.cancelarTurno(turno.id);
  }
}
