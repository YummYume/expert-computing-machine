# Testing app

Create your best tests.

## How to launch

Run `make start` and go to [http://localhost:51204/\_\_vitest\_\_/](http://localhost:51204/\_\_vitest\_\_/) (the `/` at the end is mandatory).

If you can't use make: run the following :

- `docker compose build --force-rm`
- `docker compose up -d --remove-orphans --force-recreate`

If you don't use Docker, run :

> **Note**
> These commands will work with npm/pnpm too.

- `yarn install`
- `yarn test:ui`
