import os
import time
import pg8000
from typing import Annotated
from fastapi import Depends
from sqlalchemy.exc import OperationalError, SQLAlchemyError
from sqlmodel import SQLModel, create_engine, Session
from google.cloud.sql.connector import Connector
from fastapi_playground.core.environment import get_settings
from fastapi_playground.core.logger import logger
from fastapi_playground.core.seed_data import employers_data, jobs_data
from fastapi_playground.employers.models import Employer
from fastapi_playground.jobs.models import Job

connector = Connector()
engine = None


def prepare_connection():
    settings = get_settings()

    def get_conn() -> pg8000.dbapi.Connection:
        conn: pg8000.dbapi.Connection = connector.connect(
            settings.DATABASE_INSTANCE_CONNECTION_NAME,
            "pg8000",
            user=settings.DATABASE_BUILT_IN_USER_NAME,
            password=settings.DATABASE_BUILT_IN_USER_PASSWORD,
            db="replace-this-with-your-db-name",
        )
        return conn

    return create_engine(
        "postgresql+pg8000://",
        creator=get_conn,
        # [START_EXCLUDE]
        # Pool size is the maximum number of permanent connections to keep.
        pool_size=5,
        # Temporarily exceeds the set pool_size if no connections are available.
        max_overflow=2,
        # The total number of concurrent connections for your application will be
        # a total of pool_size and max_overflow.
        # 'pool_timeout' is the maximum number of seconds to wait when retrieving a
        # new connection from the pool. After the specified amount of time, an
        # exception will be thrown.
        pool_timeout=30,  # 30 seconds
        # 'pool_recycle' is the maximum number of seconds a connection can persist.
        # Connections that live longer than the specified amount of time will be
        # re-established
        pool_recycle=1800,
    )


def init_db():
    global engine
    engine = prepare_connection()

    # since "seed" flag controls a one time operation,
    # and it doesn't include any sensitive information, we will
    # use an inline environment variable instead of including it in the .env file.
    db_action = os.getenv("DB_ACTION", "false").lower()

    if db_action == "reset_and_seed":
        SQLModel.metadata.drop_all(engine)
        SQLModel.metadata.create_all(engine)
        seed_data()
    elif db_action == "reset":
        SQLModel.metadata.drop_all(engine)
        SQLModel.metadata.create_all(engine)
    else:
        SQLModel.metadata.create_all(engine)


def get_session(max_retries=3, initial_wait=1):
    for attempt in range(max_retries):
        try:
            with Session(engine) as session:
                yield session
                break
        except (OperationalError, SQLAlchemyError) as error:
            wait_time = initial_wait * (2 ** attempt)  # Exponential backoff
            logger.error(f"Error connecting to database: {error}")
            if attempt < max_retries - 1:
                logger.info(f"Retrying in {wait_time} seconds... (attempt {attempt + 1}/{max_retries})")
                time.sleep(wait_time)
            else:
                logger.error("Max retries exceeded. Giving up.")
                raise error


def seed_data():
    session = next(get_session())

    try:
        for employer in employers_data:
            emp = Employer(**employer)
            session.add(emp)

        for job in jobs_data:
            session.add(Job(**job))

        session.commit()
    finally:
        session.close()

SessionDep = Annotated[Session, Depends(get_session)]
