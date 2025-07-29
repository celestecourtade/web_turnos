import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '@/mail/mail.service'; 

@Injectable()
export class TurnosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService, // ✅ inyectamos el servicio de mails
  ) {}

  async crearTurno(data: CreateTurnoDto) {
    const cancelToken = uuidv4(); // genera token único
  
    const turnoCreado = await this.prisma.appointment.create({
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        telefono: data.telefono,
        servicio: data.servicio,
        date: new Date(data.date),
        email: data.email, // ✅ agregamos el email
        cancelToken,
      },
    });
  
    // 🔍 Intentamos enviar el mail y mostramos errores si los hay
    try {
      await this.mailService.sendCancelacion(data.email, cancelToken);
      console.log('✅ Correo enviado correctamente a:', data.email);
    } catch (error) {
      console.error('❌ Error al enviar el correo de cancelación:', error);
    }
  
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
