import { IPushController } from '../controllers/PushController'
import Container from './inversify.config';
import { TYPES } from './types';


interface IRoute 
  {
    path: string,
    method: string,
    controller: any,
    action: string,
    rules: {
      [key: string] : {
        type: string,
        options: {
          required?: boolean,
          integer?: boolean
        }
      }
    }
  }

interface IRoutes extends Array<IRoute>{}

const routes: IRoutes = [
  {
    path: '/push/send',
    method: 'post',
    controller: Container.get<IPushController>(TYPES.IPushController),
    action: "send",
    rules: {
      message: {
        type: 'string',
        options: { required: true }
      },
      authorization: {
        type: 'string',
        options: {required: true}
      },
      template: {
        type: 'string',
        options: {required: true}
      },
      locale: {
        type: 'string',
        options: {required: true}
      },
      title: {
        type: 'string',
        options: {required: true}
      },
      recipient: {
        type: 'string',
        options: {required: true}
      }
    }
  }
]

export default routes;

