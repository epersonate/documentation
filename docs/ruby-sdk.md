---
id: ruby-sdk
title: Ruby SDK
sidebar_label: Ruby SDK
---

### Add Epersonate to your Ruby backend

First, install the ePersonate Ruby SDK:

```bash
gem install epersonate
```

In a classic Rails application with a `sessions_controller.rb`:

```ruby

require 'epersonate'
epersonate = Epersonate.new(EPERSONATE_TOKEN)

class SessionsController < ApplicationController

    def login
        (...)
        current_user(user)
    end

    def current_user=(user)
        @current_user = user
    end

    def current_user
        if (@current_user)
            return @current_user
        end

        impersonation = epersonate.verify({request: request})

        if (impersonation["valid"])
            @current_user = User.find(impersonation["userId"].to_i)
        else
            remember_token = User.hexdigest(cookies[:remember_token])
            @current_user ||= User.find_by(remember_token: remember_token)
        end
    end
end
```