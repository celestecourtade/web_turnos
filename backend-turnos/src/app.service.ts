import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  dbName: string;
}

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getDatabaseConfig(): DatabaseConfig {
    const host = this.configService.get<string>('DB_HOST');
    const port = this.configService.get<number>('DB_PORT');
    const user = this.configService.get<string>('DB_USER');
    const password = this.configService.get<string>('DB_PASSWORD');
    const dbName = this.configService.get<string>('DB_NAME');

    if (!host || !port || !user || !password || !dbName) {
      throw new InternalServerErrorException('Database configuration is incomplete');
    }

    return { host, port, user, password, dbName };
  }
}
