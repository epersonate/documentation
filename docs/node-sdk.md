---
id: node-sdk
title: Node SDK
sidebar_label: Node SDK 
---

### Add Epersonate to your NodeJS backend

First, install the EPersonate SDK:

```bash
npm install -i epersonate
```

Then in your authentication middleware method:

```js
import Epersonate from 'epersonate';
const epersonate = new Epersonate.Client({
  token: Env.get('EPERSONATE_PERSONAL_ACCESS_TOKEN')
});

 (...)
 
 async function auth (request, next) {
   (...) // Your authentication system.
  
   If (!request.user.isGlobalAdmin()) // If user is not one of your employees, return.
     return next();
  
   /*
   * Otherwise, check if impersonation mode
   * This method simply returns false if no impersonation token is present in the request. There is no speed impact for your customers.
   * If the x-epersonate-token is present and valid, returns impersonation Object
   */
   
   epersonate.verify(request)
     .then(impersonation => {
       if (!impersonation.valid)
         return next();
    
       return User.find(impersonation.userId).then(user => {
         request.user = user;
         return next();
       });
     
     }).catch(e => next(e));
 }
```