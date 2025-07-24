import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { v4 as uuidv4 } from 'uuid';



@Injectable()
export class TurnosService {
  constructor(private readonly prisma: PrismaService) {}

  async crearTurno(data: CreateTurnoDto) {
    const cancelToken = uuidv4(); // genera token único
  
    const turnoCreado = await this.prisma.appointment.create({
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        telefono: data.telefono,
        servicio: data.servicio,
        date: new Date(data.date),
        cancelToken,
      },
    });
  
    // Simular envío de email con link de cancelación:
    console.log(`Link para cancelar turno: http://localhost:3001/turnos/cancel/${cancelToken}`);
  
    return turnoCreado;
  }
  
  async obtenerTurnos() {
    return this.prisma.appointment.findMany();
  }

  async obtenerTurnoPorId(id: number) {
    return this.prisma.appointment.findUnique({
      where: { id },
    });
  }

  // Este es el método nuevo que buscás:
  async obtenerTurnoPorCancelToken(token: string) {
    return this.prisma.appointment.findUnique({
      where: { cancelToken: token },
    });
  }

  async actualizarTurno(id: number, data: Partial<UpdateTurnoDto & { date: Date }>) {
    return this.prisma.appointment.update({
      where: { id },
      data,
    });
  }

  async cancelarTurno(id: number) {
    return this.prisma.appointment.delete({
      where: { id },
    });
  }
}


