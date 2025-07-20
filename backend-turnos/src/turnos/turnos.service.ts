import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { Appointment } from '@prisma/client';

@Injectable()
export class TurnosService {
  constructor(private prisma: PrismaService) {}

  // Crear un turno
  async crearTurno(data: { userId: number; date: Date }): Promise<Appointment> {
    return this.prisma.appointment.create({
      data: {
        userId: data.userId,
        date: data.date,
      },
    });
  }

  // Listar todos los turnos
  async obtenerTurnos(): Promise<Appointment[]> {
    return this.prisma.appointment.findMany({
      include: { user: true },
    });
  }

  // Cancelar (eliminar) un turno por id
  async cancelarTurno(id: number): Promise<Appointment> {
    return this.prisma.appointment.delete({
      where: { id },
    });
  }

  // Obtener turno por ID
  async obtenerTurnoPorId(id: number): Promise<Appointment | null> {
    return this.prisma.appointment.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  // Actualizar turno
  async actualizarTurno(id: number, data: { date?: Date }): Promise<Appointment> {
    return this.prisma.appointment.update({
      where: { id },
      data,
    });
  }
}
