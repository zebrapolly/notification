const DEFAULTS = {

}
import config from '../config/config';
import { Context } from 'koa';

class Responder {
  private config: any;
  constructor () {
  }
  public middleware () {
    return (ctx: Context, next: Function) => {
      ctx.response.ok = (res: any = null, statusCode: number = 200) => {
        ctx.type = 'text/plain'
        ctx.body = this.decorator(res)
        ctx.status = statusCode
      }
      ctx.response.error = (res: any = null, statusCode: number) => {
        console.log('responder error', this.decorator(res))
        ctx.type = 'text/plain'
        ctx.body = this.decorator(null, res)
        ctx.status = statusCode
      }
      return next();
    }
  }
  private decorator(data:any = null , error:any = null) {
    return {
      version: config.apiVersion,
      root: `${config.protocol}://${config.apiHost}`,
      data,
      error
    };
  }
}


export default () => (new Responder()).middleware();;