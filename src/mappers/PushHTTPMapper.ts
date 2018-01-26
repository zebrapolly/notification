import config from "../config/config";
import * as request from 'superagent';
import { injectable } from 'inversify';

export interface IPushHTTPMapper {
  send(body: object, auth: string): object;
}

@injectable()
export class PushHTTPMapper implements IPushHTTPMapper {
  private config: object;
  constructor(
    // config: object
  ) {
    // this.config = config;
  }
  public subscribe(): any {

  }
  public unSubscribe(): any {

  }
  public send(body: object, auth: string): object {
    // return 'test';
    const query = {

    }
    return request.post('https://fcm.googleapis.com/fcm/send')
       .send(body)
       .set('Authorization', auth)
  }
}