import { Container } from "inversify";
import { TYPES } from "./types";
import config from './config';
import { MySQLConnector, IMySQLConnector } from '../connectors/MySQLConnector';
import { PushService, IPushService } from "../services/PushService";
import { TemplateMapper, ITemplateMapper } from '../mappers/TemplateMapper';
import { PushController, IPushController } from '../controllers/PushController';
import { PushHTTPMapper, IPushHTTPMapper } from '../mappers/PushHTTPMapper';

const myContainer = new Container();

const mySQLConnetion: MySQLConnector = new MySQLConnector(config.db.mysql);

myContainer.bind<IMySQLConnector>(TYPES.IMySQLConnector).toConstantValue(mySQLConnetion);
myContainer.bind<IPushController>(TYPES.IPushController).to(PushController);
myContainer.bind<IPushService>(TYPES.IPushService).to(PushService);
myContainer.bind<ITemplateMapper>(TYPES.ITemplateMapper).to(TemplateMapper)
myContainer.bind<IPushHTTPMapper>(TYPES.IPushHTTPMapper).to(PushHTTPMapper)

export default myContainer;