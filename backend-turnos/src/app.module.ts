import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppointmentsModule } from '@/appointments/appointments.module';
import { PrismaService } from '@prisma/prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AppointmentsModule,
    AuthModule, // Módulo de autenticación
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
