---
id: personal-access-token
title: Personal Access Token
sidebar_label: Personal Access Token
---

To communicate with EPersonate's API, you will need to generate a personal access token. 

Go to the [EPersonate Setting Dashboard](https://epersonate.com/app/settings) > Personal Access Token > Create Personal Access Token.

![pat](/images/pat_1.png)

Your token will only be visible once. Make sure you copy it somewhere safe.


![pat](/images/pat_2.png)

Once you have generated your personal access token, add it to your server environment variable for later use:

```bash
EPERSONATE_PERSONAL_ACCESS_TOKEN=<YOUR_TOKEN>
```