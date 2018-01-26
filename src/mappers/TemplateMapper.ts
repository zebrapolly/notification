import config from "../config/config";
import { Connection, RowDataPacket } from 'mysql';
import { MySQLConnector, IMySQLConnector } from '../connectors/MySQLConnector';
import { injectable, inject } from 'inversify';
import { TYPES } from '../config/types';

export interface ITemplateMapper {
  get(params: object): Promise<any>
}

type loadParams = {
  template: string,
  locale: string
}

type template = {

}

@injectable()
export class TemplateMapper implements ITemplateMapper {
  private config: any;
  connection: Connection;
  constructor(
    @inject(TYPES.IMySQLConnector) mySQLConnector: IMySQLConnector
    // mySQLConnector: MySQLConnector
  ) {
    this.connection = mySQLConnector.connection;
    this.config = config;
  }
  public get(params: loadParams): Promise<RowDataPacket[]> {
    // return 'test';
    console.log('TemplateMapper params', params)
    return new Promise((resolve, reject) => {
      const p = { ...params };
      const query = `SELECT * from notificationTemplates where name = '${params.template}' and locale = '${params.locale}'`;
      return this.connection.query(query, (error, rows: any) => {
        if (error) {
          reject(error);
        }
        console.log(rows[0]);
        return resolve(rows[0]);
      });
    });
  }
}