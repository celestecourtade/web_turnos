import {
  Controller,Get,Post, Delete, Patch,Body, Param, ParseIntPipe, NotFoundException, HttpCode, UseGuards,} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

type UpdatedAppointment = Omit<UpdateAppointmentDto, 'date'> & { date?: Date };

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  // ✅ Público: crear un turno
  @Post()
  async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.createAppointment(createAppointmentDto);
  }

  // ✅ Protegido: listar todos los turnos (solo admin con token)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllWithAuth() {
    return this.appointmentsService.getAllAppointments();
  }

  // ✅ Público: obtener un turno por ID
  @Get(':id')
  async getAppointmentById(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentsService.getAppointmentById(id);
  }

  // ✅ Protegido: actualizar un turno por ID (solo admin)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateWithAuth(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAppointmentDto,
  ) {
    // Desestructuramos date por separado
    const { date, ...rest } = body;
  
    // Construimos el objeto actualizado, transformando date si existe
    const updatedAppointment: Partial<UpdatedAppointment> = {
      ...rest,
      ...(date ? { date: new Date(date) } : {}),
    };
  
    return this.appointmentsService.updateAppointment(id, updatedAppointment);
  }

  // ✅ Protegido: eliminar un turno por ID (solo admin)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteWithAuth(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentsService.cancelAppointment(id);
  }

  // ✅ Público: obtener un turno por token (para cancelación por email)
  @Get('cancel/:token')
  async getAppointmentByToken(@Param('token') token: string) {
    const appointment = await this.appointmentsService.getAppointmentByCancelToken(token);
    if (!appointment) {
      throw new NotFoundException('Appointment not found with that token');
    }
    return appointment;
  }

  // ✅ Público: cancelar un turno por token
  @Delete('cancel/:token')
  @HttpCode(204)
  async cancelAppointmentByToken(@Param('token') token: string) {
    const appointment = await this.appointmentsService.getAppointmentByCancelToken(token);
    if (!appointment) {
      throw new NotFoundException('Appointment not found with that token');
    }
    await this.appointmentsService.cancelAppointment(appointment.id);
  }
}
