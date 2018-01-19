import config from "../config/config";

class PushMapper {
  private config: any;
  constructor() {
    this.config = config;
  }
  public push(): any {
    // return 'test';
    return {
      "multicast_id": 4905050923920115860,
      "success": 1,
      "failure": 0,
      "canonical_ids": 0,
      "results": [
          {
              "message_id": "0:1516355052453857%7061593170615931"
          }
      ]
  }
  }
}

export default PushMapper;