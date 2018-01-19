import PushMapper from '../mappers/PushMapper';

class PushService {
  mapper: PushMapper;
  constructor() {
    this.mapper = new PushMapper()
  }
  public push(): any {
    return this.mapper.push();
  }
}

export default PushService;