import { Connection, createConnection, QueryError } from 'mysql';
import { injectable } from 'inversify';
import "reflect-metadata";
import config from '../config/config';

export interface IMySQLConnector {
  connection: Connection
  // connect(): void;
}

// @injectable()
export class MySQLConnector implements IMySQLConnector{
  config: object
  connection: Connection;
  constructor(config: object) {
    this.config = config;
    this.connect();
  }
  private connect(): void {
    this.connection = createConnection({
      host: '127.0.0.1',
      user: 'root',
      database: 'notification_service',
      password: '12345'
    });
    this.connection.connect();
    this.connection.on('error', (err: QueryError) => {
      console.log('Connection down. Reconnecting...', err);
      setTimeout(() => {
        this.connect();
      }, 1000);
    });
    this.connection.on('connect', () => {
      console.log('Connected');
    });

  }
}


