import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User as PrismaUser } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string): Promise<Omit<PrismaUser, 'password'>> {
    const existingUser = await this.prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: { username, password: hashedPassword },
    });

    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async login(username: string, password: string): Promise<{ access_token: string }> {
    const user: PrismaUser | null = await this.prisma.user.findUnique({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}
