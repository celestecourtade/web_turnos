import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TurnosModule } from '@turnos/turnos.module';
import { PrismaService } from '@prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TurnosModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
