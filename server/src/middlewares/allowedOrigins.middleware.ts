import {
  InvocationResult,
  Provider,
  ValueOrPromise,
} from '@loopback/core';
import {HttpErrors, Middleware, MiddlewareContext} from '@loopback/rest';

export class AllowedOriginsMiddleware implements Provider<Middleware> {
  constructor() {}

  value(): ValueOrPromise<Middleware> {
    return this.intercept.bind(this);
  }

  async intercept(
    context: MiddlewareContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    const referer = context.request.headers.referer;
    if (!referer) return next();
    const refererBaseUrl = new URL(referer).origin;
    const allowedOrigins = (process.env.ALLOWED_ORIGIN ?? '')
      .split(',')
      .filter(o => !!o.length);
    if (!allowedOrigins.includes(refererBaseUrl)) {
      context.response.end(HttpErrors('Unauthorized'));
      return null;
    }

    return next();
  }
}
