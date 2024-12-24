# Default port
PORT ?= 8000

# Local development run command
run-local:
	python env_loader_local.py && fastapi dev main.py --host 0.0.0.0 --port $(PORT)

# Local development run command
run-local-reset:
	python env_loader_local.py && DB_ACTION=reset fastapi dev main.py --host 0.0.0.0 --port $(PORT)

# Local development run command
run-local-reset-and-seed:
	python env_loader_local.py && DB_ACTION=reset_and_seed fastapi dev main.py --host 0.0.0.0 --port $(PORT)

# Docker run command
# Note: In order to set the DB_ACTION environment variable in higher environments,
# you need to set it directly in the deployment environment, such as Google Cloud Run environment variables.
# Don't forget after resetting or seeding the database to stop the server
# and ru-run it without the DB_ACTION environment variable to avoid resetting or reseeding the database again.
run:
	python env_loader.py && fastapi run main.py --host 0.0.0.0 --port $(PORT)
