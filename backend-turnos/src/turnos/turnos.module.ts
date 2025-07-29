import { Module } from '@nestjs/common';
import { TurnosController } from '@turnos/turnos.controller';
import { TurnosService } from '@turnos/turnos.service';
import { PrismaService } from '@prisma/prisma.service';
import { MailService } from '@/mail/mail.service'; // importá MailService directamente


@Module({
  imports: [],
  controllers: [TurnosController],
  providers: [TurnosService, MailService, PrismaService], // PrismaService inyectado para que TurnosService lo use
  exports: [TurnosService], // Exportar el servicio si otro módulo lo necesita
})
export class TurnosModule {}
