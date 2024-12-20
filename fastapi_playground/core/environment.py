from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class EnvironmentVariables(BaseSettings):
    AUTH0_ALGORITHMS: str
    AUTH0_AUDIENCE: str
    AUTH0_DOMAIN: str
    AUTH0_ISSUER: str

    model_config = SettingsConfigDict(env_file=".env")


@lru_cache
def get_settings():
    return EnvironmentVariables()
