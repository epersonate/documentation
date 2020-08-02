# Run locally

```
cd websites
yarn start
```

# Deploy

```bash
(cd website && yarn build && cd build/epersonate/ && surge ./ docs.epersonate.com)
```