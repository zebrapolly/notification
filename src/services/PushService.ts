import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from '../config/types';

import { IPushHTTPMapper } from '../mappers/PushHTTPMapper';
import { ITemplateMapper } from '../mappers/TemplateMapper';

export interface IPushService {
  send(params: any, payload: any): Promise<any>
}

@injectable()
export class PushService implements IPushService{
  pushHTTPMapper: IPushHTTPMapper;
  templateMapper: ITemplateMapper;
  constructor(
    @inject(TYPES.IPushHTTPMapper) pushHTTPMapper: IPushHTTPMapper,
    @inject(TYPES.ITemplateMapper) templateMapper: ITemplateMapper
  ) {
    this.pushHTTPMapper = pushHTTPMapper;
    this.templateMapper = templateMapper;
  }
  public async send(params: any, payload: any): Promise<any> {
    try {
      const template = await this.templateMapper.get(payload);
      console.log('template', template)
      if (template === undefined) {
        throw new Error('template not defined');
      }
      const body = await this.processTemplate(template.template, payload.message)
      const pushBody = {
        to: payload.recipient,
        content_available: true,
        priority: 'high',
        notification: {
          title: payload.title,
          body: body,
          remote: true
        }
      }
      return this.pushHTTPMapper.send(pushBody, payload.authorization)
    } catch (e) {
      console.log('e', e);
      throw e;
    }
  }

  private processTemplate(template: string, data: any): string { // eslint-disable-line
    let message = template;
    console.log('processTemplate data', JSON.parse(data));
    const jsonData = JSON.parse(data);
    Object.keys(jsonData).forEach((key) => {
      message = message.replace(`%${key}%`, data[key]);
    });
    return message;
  }
}
