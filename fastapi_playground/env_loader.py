import asyncio
from dataclasses import dataclass, fields
from functools import lru_cache
from pathlib import Path
from google.cloud import secretmanager
from pydantic_settings import BaseSettings, SettingsConfigDict

# Note: The deployment environments can override the environment variables.
class EnvironmentVariablesRef(BaseSettings):
    GCP_PROJECT: str
    AUTH0_ALGORITHMS_REF: str
    AUTH0_AUDIENCE_REF: str
    AUTH0_DOMAIN_REF: str
    AUTH0_ISSUER_REF: str
    DATABASE_INSTANCE_CONNECTION_NAME_REF: str
    DATABASE_BUILT_IN_USER_NAME_REF: str
    DATABASE_BUILT_IN_USER_PASSWORD_REF: str

    model_config = SettingsConfigDict(env_file=".env_ref")


@lru_cache
def get_settings_ref():
    return EnvironmentVariablesRef()


@dataclass
class ProcessedEnvironmentVariables:
    AUTH0_ALGORITHMS: str
    AUTH0_AUDIENCE: str
    AUTH0_DOMAIN: str
    AUTH0_ISSUER: str
    DATABASE_INSTANCE_CONNECTION_NAME: str
    DATABASE_BUILT_IN_USER_NAME: str
    DATABASE_BUILT_IN_USER_PASSWORD: str


async def get_secret(secret_name: str, project_id: str, client_async) -> str:
    """Fetch a single secret asynchronously."""
    name = f"projects/{project_id}/secrets/{secret_name}/versions/latest"
    response = await client_async.access_secret_version(request={"name": name})
    return response.payload.data.decode("UTF-8")


async def fetch_secrets_to_env():
    settings_ref = get_settings_ref()
    """Fetch secrets from Google Cloud Secret Manager and write them to a .env file."""
    client_async = secretmanager.SecretManagerServiceAsyncClient()

    # Map the environment variables to their secret names
    mapped_environment_variables = ProcessedEnvironmentVariables(
        AUTH0_ALGORITHMS=settings_ref.AUTH0_ALGORITHMS_REF,
        AUTH0_AUDIENCE=settings_ref.AUTH0_AUDIENCE_REF,
        AUTH0_DOMAIN=settings_ref.AUTH0_DOMAIN_REF,
        AUTH0_ISSUER=settings_ref.AUTH0_ISSUER_REF,
        DATABASE_INSTANCE_CONNECTION_NAME=settings_ref.DATABASE_INSTANCE_CONNECTION_NAME_REF,
        DATABASE_BUILT_IN_USER_NAME=settings_ref.DATABASE_BUILT_IN_USER_NAME_REF,
        DATABASE_BUILT_IN_USER_PASSWORD=settings_ref.DATABASE_BUILT_IN_USER_PASSWORD_REF,
    )

    try:
        # Create tasks to fetch all secrets in parallel
        tasks = {
            field.name: asyncio.create_task(
                get_secret(
                    getattr(mapped_environment_variables, field.name),
                    settings_ref.GCP_PROJECT,
                    client_async
                )
            )
            for field in fields(mapped_environment_variables)
        }

        # Fetch all secrets
        secrets = await asyncio.gather(*tasks.values())
        secrets_dict = {
            field: resolved_secret
            for field, resolved_secret in zip(tasks.keys(), secrets)
        }

        # Write secrets to .env file
        env_path = Path(__file__).parent / ".env"
        with env_path.open("w") as env_file:
            for key, value in secrets_dict.items():
                env_file.write(f"{key}={value}\n")

        print(f"Secrets have been written to {env_path}")
    except Exception as e:
        print(f"Error fetching secrets: {e}")


if __name__ == "__main__":
    asyncio.run(fetch_secrets_to_env())
