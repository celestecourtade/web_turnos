import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(username: string, password: string) {
    // Usuario hardcodeado para ejemplo
    if (username === 'admin' && password === 'admin123') {
      const payload = { username };
      const token = this.jwtService.sign(payload);
      return { access_token: token };
    }

    throw new UnauthorizedException('Credenciales inválidas');
  }
}
