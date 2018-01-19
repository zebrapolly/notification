const DEFAULTS = {

}
import config from '../config/config';

class Responder {
  private config: any;
  constructor () {
  }
  public middleware () {
    return (ctx, next) => {
      ctx.response.ok = (res: any = null) => {
        ctx.type = 'text/plain'
        ctx.body = this.decorator(res)
        ctx.status = 200
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