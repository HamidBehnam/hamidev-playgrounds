from typing import TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from fastapi_playground.jobs.models import Job


class Employer(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    email: str
    industry: str
    jobs: list["Job"] = Relationship(back_populates="employer")
