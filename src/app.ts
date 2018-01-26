// if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') require('dotenv').config();

import * as Koa from 'koa';
import {
  Context
} from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as Router from 'koa-router';
import {
  validator
} from './middlewares/validator';
import responder from './middlewares/responder';
import errorHandler from './middlewares/errorHandler';

import routes from './config/routes';
import config from './config/config';
// import container from './config/inversify.config';

const app = new Koa();
const port = config.port;
const router = new Router();


routes.forEach((route) => router[route.method](
  route.path,
  validator(route.rules),
  async (ctx: Context) => {
      const res = await route.controller[route.action]({}, ctx.request.body)
      ctx.response.ok(res, 200)
  }));

app
  .use(responder())
  .use(errorHandler())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;