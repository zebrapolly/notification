import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from '../config/types';
import { PushService, IPushService } from '../services/PushService';
import {
  Context
} from 'koa';

type SendParams = {}
type SendPayload = {
  authorization: string,
  message: string,
  template: string,
  locale: string,
  title: string,
  recipient: string
}

export interface IPushController {
  send(params: SendParams, payload: SendPayload): Promise<any>
}

@injectable()
export class PushController implements IPushController {
  [key: string]: any;
  private _service: IPushService;
  public constructor(
    @inject(TYPES.IPushService) service: IPushService
  ) {
    this._service = service;
  }
  public send = async(params: SendParams, payload: SendPayload): Promise < any > => {
        return this._service.send(params, payload)
    }
}