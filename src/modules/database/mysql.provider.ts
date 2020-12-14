import { Injectable, Logger } from '@nestjs/common';
import { Connection, createPool, Pool } from 'mysql2/promise';

@Injectable()
export class MySQLProvider {
  private readonly logger: Logger;
  private readonly pool: Pool;

  constructor() {
    this.logger = new Logger('MySQLProvider');
    this.pool = createPool({
      // Comando utilizado para descobrir endereço do container.
      // docker inspect -f '{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -aq)
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
      waitForConnections: true,
      connectionLimit: 20,
    });
    this.logger.log('Initialized');
  }

  async getConnection(): Promise<Connection> {
    return await this.pool.getConnection();
  }
}
