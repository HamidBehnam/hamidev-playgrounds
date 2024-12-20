from typing import Annotated
from fastapi import APIRouter, Query, HTTPException, Depends
from sqlmodel import select
from fastapi_playground.core.auth import get_current_user
from fastapi_playground.core.db import SessionDep
from fastapi_playground.heroes.models import Hero, HeroCreate, HeroPublic, HeroUpdate

hero_router = APIRouter()

@hero_router.post("/", response_model=HeroPublic)
async def create_hero(hero: HeroCreate, session: SessionDep) -> Hero:
    hero_db = Hero.model_validate(hero)
    session.add(hero_db)
    session.commit()
    session.refresh(hero_db)
    return hero_db

@hero_router.get("/", response_model=list[HeroPublic])
def read_heroes(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
):
    heroes = session.exec(select(Hero).offset(offset).limit(limit)).all()
    return heroes

@hero_router.get("/{hero_id}", response_model=HeroPublic)
async def read_hero(hero_id: int, session: SessionDep):
    hero = session.get(Hero, hero_id)
    if hero is None:
        raise HTTPException(status_code=404, detail="Hero not found")
    return hero

@hero_router.delete("/{hero_id}")
async def delete_hero(
    hero_id: int,
    session: SessionDep,
    current_user: dict = Depends(get_current_user)
):
    print(f"Current user id: {current_user.get('sub')}")
    hero = session.get(Hero, hero_id)
    if hero is None:
        raise HTTPException(status_code=404, detail="Hero not found")
    session.delete(hero)
    session.commit()
    return {"ok": True}

@hero_router.patch("/{hero_id}", response_model=HeroPublic)
async def update_hero(hero_id: int, hero: HeroUpdate, session: SessionDep):
    hero_db = session.get(Hero, hero_id)
    if hero_db is None:
        raise HTTPException(status_code=404, detail="Hero not found")
    hero_data = Hero.model_dump(hero, exclude_unset=True)
    hero_db.sqlmodel_update(hero_data)
    session.add(hero_db)
    session.commit()
    session.refresh(hero_db)
    return hero_db
