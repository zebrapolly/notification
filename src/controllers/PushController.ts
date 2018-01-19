import IController from './IController';
import PushService from '../services/PushService';


class PushController {
  private service: PushService;
  constructor() {
    this.service = new PushService();
  }
  // [key: string]: any;
  // service = new PushService();
  public send(): any {
  // throw Error('some error');
  console.log(this)
    return this.service.push();
  }
}

export default PushController;