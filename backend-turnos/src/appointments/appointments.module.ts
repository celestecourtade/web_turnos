import { Module } from '@nestjs/common';
import { AppointmentsController } from '@/appointments/appointments.controllers';
import { AppointmentsService } from '@/appointments/appointments.service';
import { PrismaService } from '@prisma/prisma.service';
import { MailService } from '@/mail/mail.service'; // Importá MailService directamente

@Module({
  imports: [],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, MailService, PrismaService], // PrismaService inyectado para que AppointmentsService lo use
  exports: [AppointmentsService], // Exportar el servicio si otro módulo lo necesita
})
export class AppointmentsModule {}
