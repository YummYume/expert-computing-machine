COMPOSE=docker compose
EXECNODE=$(COMPOSE) exec todo-app
ifeq (up,$(firstword $(MAKECMDGOALS)))
  # use the second argument for "up"
  UP_ENV_FILE := $(wordlist 2, 2, $(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(UP_ENV_FILE):;@:)
endif

# Starting and stopping the project
start:
	$(COMPOSE) build --force-rm
	$(COMPOSE) up -d --remove-orphans --force-recreate

start-nocache:
	$(COMPOSE) build --force-rm --no-cache
	$(COMPOSE) up -d --remove-orphans --force-recreate

up:
ifndef UP_ENV_FILE
	$(COMPOSE) up -d --remove-orphans
else
	$(COMPOSE) --env-file ${UP_ENV_FILE} up -d --remove-orphans
endif

stop:
	$(COMPOSE) stop

down:
	$(COMPOSE) down

# SSH
ssh:
	$(EXECNODE) sh

bash:
	$(EXECNODE) bash

# Logs
logs:
	$(COMPOSE) logs

logs-node:
	$(COMPOSE) logs todo-app

# Yarn
upgrade:
	$(EXECNODE) yarn upgrade-interactive

upgrade-latest:
	$(EXECNODE) yarn upgrade-interactive --latest

# Testing
test:
	$(EXECNODE) yarn test

test-watch:
	$(EXECNODE) yarn test:watch
