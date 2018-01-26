const NOTFOUND_STATUS = 404;
const BAD_IMPLEMENTATION_STATUS = 500;
import { Context } from 'koa';

const handleError = () => {
  // if (typeof onError !== 'function') {
  //   throw new TypeError('onError must be a function');
  // }

  return (context: Context, next: Function) => next()
    .then(() => {
      if (context.body === undefined && context.request.method !== 'OPTIONS') {
        context.response.error({ message: "Route Not Found" }, NOTFOUND_STATUS);
      }
    })
    .catch((err: Error) => {
      console.log('error handler', err.stack)
      context.response.error({message: 'Server error', stack: err.stack}, BAD_IMPLEMENTATION_STATUS);
    });
};


export default handleError;