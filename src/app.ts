// if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') require('dotenv').config();

import * as Koa from 'koa';
import { Context } from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as Router from 'koa-router';
import { validator } from 'koa-router-joi-validator';
import responder from './middlewares/responder';

import routes from './config/routes';
import config from './config/config';

const app = new Koa();
const port = config.port;
const router = new Router();

function getMethod<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key].apply(obj);
}

function prop<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

routes.forEach((route) => router[route.method](
  route.path,
  validator(route.rules),
  (ctx: Context) => ctx.response.ok(getMethod(route.controller, prop(route, action))()))
);

app.use(responder())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;