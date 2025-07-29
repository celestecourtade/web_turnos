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
  UseGuards,
} from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Asegurate de que este path sea correcto

@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}

  // ✅ Público: crear turno
  @Post()
  async crearTurno(@Body() createTurnoDto: CreateTurnoDto) {
    return this.turnosService.crearTurno(createTurnoDto);
  }

  // ✅ Protegido: listar turnos (solo admin con token)
  @UseGuards(JwtAuthGuard)
  @Get()
  async listarConAuth() {
    return this.turnosService.obtenerTurnos();
  }

  // ✅ Público: ver turno por ID
  @Get(':id')
  async obtenerTurnoPorId(@Param('id', ParseIntPipe) id: number) {
    return this.turnosService.obtenerTurnoPorId(id);
  }

  // ✅ Protegido: actualizar turno (solo admin)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async actualizarConAuth(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTurnoDto,
  ) {
    const turnoActualizado: any = { ...body };
    if (body.date) {
      turnoActualizado.date = new Date(body.date);
    }
    return this.turnosService.actualizarTurno(id, turnoActualizado);
  }

  // ✅ Protegido: eliminar turno (solo admin)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async borrarConAuth(@Param('id', ParseIntPipe) id: number) {
    return this.turnosService.cancelarTurno(id);
  }

  // ✅ Público: obtener turno por token (para cancelación por email)
  @Get('cancel/:token')
  async obtenerTurnoPorToken(@Param('token') token: string) {
    const turno = await this.turnosService.obtenerTurnoPorCancelToken(token);
    if (!turno) {
      throw new NotFoundException('Turno no encontrado con ese token');
    }
    return turno;
  }

  // ✅ Público: cancelar turno por token
  @Delete('cancel/:token')
  @HttpCode(204)
  async cancelarTurnoPorToken(@Param('token') token: string) {
    const turno = await this.turnosService.obtenerTurnoPorCancelToken(token);
    if (!turno) {
      throw new NotFoundException('Turno no encontrado con ese token');
    }
    await this.turnosService.cancelarTurno(turno.id);
  }
}
