.PHONY: dev
dev:
	@mix phx.server

.PHONY: unit
unit:
	@mix test

.PHONY: format
format:
	@mix format

.PHONY: lint
lint: lint-elixir # See https://github.com/mirego/elixir-boilerplate/blob/master/Makefile#L121

.PHONY: lint-elixir
lint-elixir:
	mix compile --warnings-as-errors --force
	mix credo --strict

.PHONY: tests
tests: unit format lint

# Start database in docker in foreground
.PHONY: pgsql
pgsql:
	@docker stop gringotts-pgsql || true
	@docker rm gringotts-pgsql || true
	@docker run -it --rm --name gringotts-pgsql -v $(shell pwd)/.docker:/docker-entrypoint-initdb.d -p 5432:5432 postgres:12-alpine \
		postgres -c 'log_statement=all' -c 'max_connections=1000' -c 'log_connections=true'  -c 'log_disconnections=true'  -c 'log_duration=true'

# Start database in docker in background
.PHONY: start-pgsql
start-pgsql:
	docker start gringotts-pgsql || docker run -d -v $(shell pwd)/.docker:/docker-entrypoint-initdb.d -p 5432:5432 --name gringotts-pgsql postgres:12-alpine

.PHONY: clean-pgsql
clean-pgsql:
	@docker stop gringotts-pgsql || true
	@docker rm gringotts-pgsql || true

.PHONY: stop-pgsql
stop-pgsql:
	@docker stop gringotts-pgsql || true
