import PushController from '../controllers/PushController.js'

type controller = PushController;

interface IRoute 
  {
    path: string,
    method: string,
    controller: controller,
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
    controller: new PushController(),
    action: 'send',
    rules: {
      message: {
        type: 'number',
        options: { integer: true, required: true }
      }
    }
  }
]

export default routes;

