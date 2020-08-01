---
id: adonis
title: AdonisJS
sidebar_label: AdonisJS
---

### Add Epersonate to your AdonisJS backend


Similarly to NodeJS, add our node SDK:

```bash
npm install -i epersonate
```

Create an Adonis middleware:

```bash
adonis middleware epersonate --http
```

Add to your kernel global middleware config:

```bash
const namedMiddleware = {
  auth: 'Adonis/Middleware/Auth',
  guest: 'Adonis/Middleware/AllowGuestOnly',
  epersonate: 'App/Middleware/Epersonate'
}
```

In route.js file, add the middleware to your authenticated routes:

```
Route.group(() => {
    /*
    * Your protected Routes.
    */
    (...)
}).middleware('epersonate').middleware('auth')
```

In your newly created App/Middleware/Epersonate.js:

```js
'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')
const User = use('App/Models/User');

const Epersonate = use('epersonate');
const epersonate = new Epersonate.Client({
  token: Env.get('EPERSONATE_PERSONAL_ACCESS_TOKEN')
});

class Impersonation {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({request, auth}, next) {
    try {
      const res = await epersonate.verify({request});
      if (!res.body.valid)
        return await next();

      const user = await User.find(res.body.userId);
      auth.user = user;
      await next();
    } catch (e) {
      return await next();
    }
    
  }
}

module.exports = Impersonation
```