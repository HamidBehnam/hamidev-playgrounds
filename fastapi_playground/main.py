from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from fastapi_playground.core.auth import verify_token
from fastapi_playground.core.db import create_db_and_tables
from fastapi_playground.heroes.routes import hero_router
from fastapi_playground.items.routes import items_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield
    print("Tearing down")

app = FastAPI(lifespan=lifespan)
app.include_router(hero_router, prefix="/heroes", tags=["heroes"], dependencies=[Depends(verify_token)])
app.include_router(items_router, prefix="/items", tags=["items"])
