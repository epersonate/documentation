---
id: adonis
title: AdonisJS
sidebar_label: AdonisJS
---

### Add Epersonate to your AdonisJS backend


Similarly to NodeJS, add our node SDK:

```bash
npm install -i @epersonate/epersonate
```

Create an Adonis middleware:

```bash
adonis middleware impersonation --http
```

Add to your kernel global middleware config:

```bash
const namedMiddleware = {
  auth: 'Adonis/Middleware/Auth',
  guest: 'Adonis/Middleware/AllowGuestOnly',
  impersonate: 'App/Middleware/Impersonation'
}
```

In route.js file, add the middleware to your authenticated routes:

```
Route.group(() => {
    /*
    * Your protected Routes.
    */
    (...)
}).middleware('impersonate').middleware('auth')
```

Add the `impersonate` middleware right after your `auth` middleware if you want to make sure that an admin is impersonating.

In your newly created App/Middleware/Impersonation.js:

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
    // Verify that impersonator is an employee (Replace with your own verification logic)
    const company = await auth.user.company().fetch();
    if (company.id !== 1)
       return await next();

    const impersonation = await epersonate.verify({request});
    if (impersonation.valid) {
      const user = await User.find(impersonation.userId);
      auth.user = user;
    }
    return await next();
  }
}

module.exports = Impersonation
```