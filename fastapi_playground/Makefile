# Default port
PORT ?= 8000

# Local development run command
run-local:
	python env_loader_local.py && fastapi dev main.py --host 0.0.0.0 --port $(PORT)

# Docker run command
run:
	python env_loader.py && fastapi dev main.py --host 0.0.0.0 --port $(PORT)
