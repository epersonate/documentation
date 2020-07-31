---
id: back-end-authentication
title: Back End Authentication
sidebar_label: Back End Authentication
---

## How does EPersonate works

A quick background on how EPersonate works internally will help you implement it correctly in your system.

When you want to impersonate a customer, you will first go to your [Dashboard](https://epersonate.com/app/impersonations/me) and create a new impersonation. 
backendauthentication_1

![backendauthentication](/images/backendauthentication_1.jpg)

To create a new impersonation, click on the (+) sign at the bottom right of the page. You will have to provide a user ID which matches to your system.


![backendauthentication](/images/backendauthentication_2.png)


EPersonate will generate a unique Json Web Token that you will use to impersonate your customer.

To start an impersonation, copy the impersonation link and open it in a new tab.

![backendauthentication](/images/backendauthentication_3.jpg)


_If the Base URL is not configured properly, you can change it in your [settings](https://epersonate.com/app/settings). See the [Impersonation Configurations guide](https://docs.epersonate.com/docs/impersonation-configurations) for more information._


