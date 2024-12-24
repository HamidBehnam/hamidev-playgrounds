from sqlmodel import SQLModel, Field, Relationship
from fastapi_playground.employers.models import Employer


class Job(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    description: str
    employer_id: int | None = Field(default=None, foreign_key="employer.id")
    employer: Employer | None = Relationship(back_populates="jobs")
