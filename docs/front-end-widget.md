---
id: front-end-widget
title: Front End Widget
sidebar_label: Front End Widget
---

## Add widget

Copy the following code at the bottom of the body tag in your index.html page:

<!--DOCUSAURUS_CODE_TABS-->
<!--JavaScript-->

```html
<script>
    window.epersonateSettings = {
        cookies: true
    }
    (function(){function b(d,e,g){function a(j,i){if(!e[j]){if(!d[j]){var f="function"==typeof require&&require;if(!i&&f)return f(j,!0);if(h)return h(j,!0);var c=new Error("Cannot find module '"+j+"'");throw c.code="MODULE_NOT_FOUND",c}var k=e[j]={exports:{}};d[j][0].call(k.exports,function(b){var c=d[j][1][b];return a(c||b)},k,k.exports,b,d,e,g)}return e[j].exports}for(var h="function"==typeof require&&require,c=0;c<g.length;c++)a(g[c]);return a}return b})()({1:[function(){"use strict";(function(){window.epersonateSettings||(window.epersonateSettings={cookies:!0,session:!1});var a=new URL(document.location),b=document.location.hash.split("#ePersonateToken=");if(b&&b[1]){var c=b[1];if(window.epersonateSettings.session&&sessionStorage.setItem("x-epersonate",c),window.epersonateSettings.cookies){var d=new Date,e=new Date(d.getTime()+86400000);document.cookie="".concat("x-epersonate","=").concat(c,";SameSite=Lax;expires=").concat(e.toUTCString(),";")}return void window.history.pushState("",document.title,"".concat(a.protocol,"//").concat(a.host).concat(a.pathname))}})(),(sessionStorage.getItem("x-epersonate")||-1<document.cookie.indexOf("x-epersonate"))&&function(){var a=window,b=a.Epersonate;if("function"==typeof b)b("reattach_activator"),b("update",a.whoImpersonatedSettings);else{var c=document,d=function a(){a.c(arguments)};d.q=[],d.c=function(a){d.q.push(a)},a.Epersonate=d;var e=function(){var a=c.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://api.epersonate.com/js/prod/widget.min.js";var b=c.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)};a.attachEvent?a.attachEvent("onload",e):a.addEventListener("load",e,!1)}}()},{}]},{},[1]);
</script>
```

_Note on speed: Our SDK is loaded only if there is an admin impersonation. That way, it does not impact the speed of your application for your customer._

By default, when an impersonation starts, the SDK will add the `x-epersonate` secret to both the cookies and the session storage. Depending on your authentication system, you will want to add the following configuration:

## Using Cookies

If you are using cookies to authenticate to your back-end, you are done! 

When an admin starts an impersonation, the EPersonate widget adds a `x-epersonate` cookie to your domain.


## Using Session

Update the above code snippet with:

```html
<script>
  window.epersonateSettings = {
      session: true
  }
  (...)
</script>
```


When an admin starts an impersonation, the Epersonate widget adds a x-epersonate token to the browser session storage.

This token will be used by your backend system. Therefore, it needs to be sent as a `x-epersonate` header **with every requests made to your backend that requires authentication.**

Therefore, oyu will need to update your API Wrapper: 

#### Using Fetch:

```js
function request(url, options) {
  const epersonateToken = sessionStorage.getItem("x-epersonate");
  if (epersonateToken)
    options.headers["x-epersonate"] = epersonateToken;

  return fetch(url, options);
}
```

That's it!
