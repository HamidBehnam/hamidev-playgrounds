import strawberry
from typing import List, TYPE_CHECKING, Optional
from sqlmodel import select
from fastapi_playground.core.db import get_session
from fastapi_playground.jobs.models import Job

if TYPE_CHECKING:
    from fastapi_playground.jobs.graphql.types import Job as JobType



def get_jobs(info: strawberry.Info) -> List["JobType"]:
    print("current user: ", info.context.get("current_user"))
    session = next(get_session())
    return session.exec(select(Job)).all()

def get_job(info: strawberry.Info, id: str) -> "JobType":
    session = next(get_session())
    return session.get(Job, id)

def create_job(info: strawberry.Info, title: str, description: str, employer_id: int) -> "JobType":
    session = next(get_session())
    job = Job(title=title, description=description, employer_id=employer_id)
    session.add(job)
    session.commit()
    session.refresh(job)
    return job

def update_job(info: strawberry.Info, id: str, title: Optional[str] = None, description: Optional[str] = None, employer_id: Optional[int] = None) -> "JobType":
    print("current user: ", info.context.get("current_user"))
    session = next(get_session())
    job = session.get(Job, id)
    if job is None:
        raise Exception("Job not found")
    if title:
        job.title = title
    if description:
        job.description = description
    if employer_id:
        job.employer_id = employer_id
    session.commit()
    session.refresh(job)
    return job

def delete_job(info: strawberry.Info, id: str) -> bool:
    session = next(get_session())
    job = session.get(Job, id)
    if job is None:
        raise Exception("Job not found")
    session.delete(job)
    session.commit()
    return True
