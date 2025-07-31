import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '@/mail/mail.service';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService, // ✅ Inyectamos el servicio de mails
  ) {}

  // ✅ Crear un nuevo turno con token de cancelación y envío de correo
  async createAppointment(data: CreateAppointmentDto) {
    const cancelToken = uuidv4(); // Genera token único

    const createdAppointment = await this.prisma.appointment.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        service: data.service,
        date: new Date(data.date),
        email: data.email,
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

    return createdAppointment;
  }

  // ✅ Obtener todos los turnos
  async getAllAppointments() {
    return this.prisma.appointment.findMany();
  }

  // ✅ Obtener un turno por ID
  async getAppointmentById(id: number) {
    return this.prisma.appointment.findUnique({
      where: { id },
    });
  }

  // ✅ Obtener un turno por token de cancelación
  async getAppointmentByCancelToken(token: string) {
    return this.prisma.appointment.findUnique({
      where: { cancelToken: token },
    });
  }

  // ✅ Actualizar turno
  async updateAppointment(
    id: number,
    data: Partial<Omit<UpdateAppointmentDto, 'date'> & { date?: string | Date }>
  ) {
    return this.prisma.appointment.update({
      where: { id },
      data,
    });
  }
  

  // ✅ Cancelar (eliminar) un turno
  async cancelAppointment(id: number) {
    return this.prisma.appointment.delete({
      where: { id },
    });
  }
}
